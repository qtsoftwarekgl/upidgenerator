module.exports = {
  content_type: {
    name: 'Content-Type',
    type: 'string',
    in: 'header',
    required: true,
    value: 'application/json'
  },
  auth_token: {
    name: 'x-auth-token',
    type: 'string',
    in: 'header',
    required: true,
    value: ''
  }
}
