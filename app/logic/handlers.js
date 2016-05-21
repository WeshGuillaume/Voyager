
import { createHandler } from './createHandler'

const define = createHandler({
  redirect: true,
})

export default define({
  command: 'voyager',
  description: 'Native Voyaegr pages',

  exec ({ content, command }) {
    if (!(content.trim().indexOf('voyager://') === 0)) { return }
    console.log('Requested', content.replace('voyager://', ''))
  }
})
