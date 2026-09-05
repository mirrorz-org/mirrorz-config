# mirrorz-302 site configuration

This directory contains the static site and endpoint configuration used by
[mirrorz-302](https://github.com/mirrorz-org/mirrorz-302). Repository
availability, paths, status, and freshness come from mirrorz-monitor instead.

## Setup

Set `mirrorz-d-directory` in the mirrorz-302 configuration to the absolute path
of `sites`.

To add a new site, create a new directory under `sites` and name it with the site abbreviation.
Then create a `config.json` file in that directory like the following example:

```json
{
  "abbrs": ["TUNA.NANO", "TUNA.NEO"],
  "endpoints": [
    {
      "label": "tuna",
      "public": true,
      "resolve": "mirrors.tuna.tsinghua.edu.cn",
      "range": ["REGION:BJ", "ISP:CERNET"],
      "filter": ["V4", "V6", "SSL", "NOSSL"]
    }
  ]
}
```

The values in `abbrs` must exactly match the `mirror` tag written by
mirrorz-monitor. Multiple abbreviations may share one endpoint configuration.

create a JS file in that directory to define how to fetch the mirror list and parse it.
For example, to fetch mirrorz.json from the site, you can following this:

```js
module.exports = async function () {
    const response = await fetch("https://mirrors.example.edu.cn/static/mirrorz.json");
    return response.json();
}
```

After editing a site file, send `SIGHUP` to the running mirrorz-302 process to
reload the directory. If reloading fails, mirrorz-302 keeps the previously
loaded configuration.
