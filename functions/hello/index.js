console.log('starting function')
exports.handle = (e, ctx, callback) => {
  console.log('processing event: %j', e);
  const body = {
    title: 'Michael Scott oh god no',
    url: 'https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif',
    tags: ['oh god no']
  };
  const res = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {},
    body: JSON.stringify(body)
  };
  callback(null, res);
}
