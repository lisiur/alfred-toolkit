# alfred-toolkit
A toolkit for alfred workflow development **without dependencies**

# Quick Start

```javascript
const alfred = require('alfred-toolkit')
const input = alfred.input // get user input
const {data} = await alfred.get(url) // fetch data
const {data} = await alfred.getJson(url) // fetch json data
await alfred.download(filePath, remoteUrl) // download file
```
