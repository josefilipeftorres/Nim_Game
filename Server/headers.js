module.exports.headers = {
    "plain": {
        "Content-Type": "application/javascript",
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin": "*"
    },
    sse: {
        "Content-Type": "text/event-stream",
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Connection": "keep-alive"
    }
};