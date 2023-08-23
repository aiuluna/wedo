import { Router } from 'express';
import path from 'path'
import { CodeRunner } from '@wedo/code-tools'

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello wedo-svc-faas!');
});

router.get('/:user/:page/:fn', async (req, res) => {
  const { user, page, fn } = req.params
  try {
    const runner = new CodeRunner(path.resolve(__dirname, "./temp"), user, 'faas-' + page)
    const result = await runner.run(fn)
    res.send({
      success: true,
      data: result
    })
  } catch (ex) {
    console.error(ex)
    res.status(500).send({
      success: false,
      status: 500,
      message: ex.toString()
    })
  }

})

export default router;
