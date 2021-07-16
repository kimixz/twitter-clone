

// This RegExp runs 1,000,000 times per 245ms
const emailRegex = /^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const base64URLRegex = /^data:((?:application|audio|image|text|video)\/(.+));base64,(.+)/

module.exports = {
  emailRegex,
  base64URLRegex,
}
