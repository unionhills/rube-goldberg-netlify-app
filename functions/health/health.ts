// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
export const handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'pass',
        path: event.path
      })
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
