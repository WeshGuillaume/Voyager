
export const createHandler = (exec, {
  name = 'Untitled',
  match = () => true,
} = {}) => {

  return {
    name,
    match,
    exec,
  }
}
