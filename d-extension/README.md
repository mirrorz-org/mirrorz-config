# mirrorz-302 site configuration

This directory contains the static site and endpoint configuration used by
[mirrorz-302](https://github.com/mirrorz-org/mirrorz-302). Repository
availability, paths, status, and freshness come from mirrorz-monitor instead.

## Setup

Set `mirrorz-d-directory` in the mirrorz-302 configuration to the absolute path
of `d-extension/sites`.

Each JSON file has this shape:

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

After editing a site file, use `./update.sh` to make mirrorz-302 reload the
directory.
