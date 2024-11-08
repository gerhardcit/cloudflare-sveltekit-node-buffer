# Cloudflare Node:Buffer Compatibility

Testing of crypto works on cloudflare pages.

* Accordign to https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/ it should.
  

Running this on cloudflare pages produces this error:
```
 "logs": [
    {
      "message": [
        "Error: Dynamic require of \"node:buffer\" is not supported"
      ],
      "level": "error",
      "timestamp": 1731052872553
    }
  ],
```

The culprit seems to be jsonwebtoken

Build output:
```shell
08:28:51.532	 ⛅️ wrangler 3.76.0
08:28:51.533	-------------------
08:28:52.514	▲ [WARNING] The package "node:buffer" wasn't found on the file system but is built into node.
08:28:52.515	
08:28:52.515	  Your Worker may throw errors at runtime unless you enable the "nodejs_compat" compatibility flag. Refer to https://developers.cloudflare.com/workers/runtime-apis/nodejs/ for more details. Imported from:
08:28:52.516	   - _worker.js
```