
const defaults = {
  version: '0.0.1',
}

export const createHandler = permissions => description => {

  const functions = Object.keys(permissions).reduce((p, c) =>
    ({ ...p, [c]: permissions[c] ? defaults[c] || null : false }), {})

  return Object.assign(
    query => description.exec(query, functions),
    {
      description,
      permissions,
    }
  )
}
