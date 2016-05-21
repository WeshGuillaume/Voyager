
const defaults = {
  version: '0.0.1',
}

export const createHandler = (permissions, description) => actions => {

  const functions = Object.keys(permissions).reduce((p, c) =>
    ({ ...p, [c]: actions[c] }), {})

  return Object.assign(
    query => description.exec(query, functions),
    {
      description,
      permissions,
    }
  )
}
