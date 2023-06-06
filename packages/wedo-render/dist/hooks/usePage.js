import { Page, Topic } from "@wedo/meta";
import { useEffect, useRef, useState } from "react";
import { WedoContext } from '@wedo/runtime';
import { ComponentsLoader } from "@wedo/loader/lib";
import { fileRemote, compose, pageRemote } from '@wedo/request';
import { CodeProjectRepo } from '@wedo/code';
const json = {
    page: {
        type: "react",
        name: "page",
        group: "container",
        box: {
            left: 300,
            top: 40,
            width: 414,
            height: 736,
        },
        children: [],
        style: {
            border: "1px solid #eee",
            backgroundColor: "white",
        },
    },
    links: {}
};
function runScript(text, ctx) {
    function define(deps, callback) {
        if (!callback) {
            // @ts-ignore
            callback = deps;
            deps = [];
        }
        const r = callback();
        // @ts-ignore
        r(ctx);
    }
    return eval(text);
}
export const usePage = (pageName) => {
    const [page, setPage] = useState(null);
    const ctx = useRef(null);
    useEffect(() => {
        ComponentsLoader.getInstance().on(Topic.RemoteComponentsLoaded).subscribe(() => {
            loadPage();
        });
        ComponentsLoader.getInstance().load();
    }, []);
    async function run(page) {
        try {
            const user = localStorage['x-user'];
            const project = await CodeProjectRepo.load(user, 'codeless-' + pageName);
            const url = project.getScriptURL();
            const result = await fileRemote.get(url);
            const content = result.data;
            ctx.current = new WedoContext(page);
            runScript(content, ctx.current);
        }
        catch (error) {
        }
    }
    async function loadPage() {
        const svcCall = compose(pageRemote.get, fileRemote.get, (data) => {
            if (!data)
                return false;
            return [data.url];
        });
        const user = localStorage['x-user'];
        const result = await svcCall(user, pageName);
        let data;
        if (result.success) {
            data = JSON.parse(result.data);
        }
        else {
            data = json;
        }
        const page = new Page(pageName, data, ComponentsLoader.getInstance());
        await run(page);
        page.emit(Topic.Initialize);
        setPage(page);
    }
    return page;
};
