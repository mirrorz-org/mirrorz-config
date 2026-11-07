function merge(data, override) {
  if (Array.isArray(override)) return [...override, ...(data || [])];
  if (override && typeof override === "object") {
    const result = { ...data };
    for (const [key, value] of Object.entries(override)) {
      result[key] = merge(data?.[key], value);
    }
    return result;
  }
  return override;
}

module.exports = async function (mirrorz, override) {
  const { mirrors = [], ...fields } = override;
  const result = merge(mirrorz, fields);
  result.mirrors = [
    ...mirrors.map(mirror => merge(mirrorz.mirrors.find(item => item.cname === mirror.cname), mirror)),
    ...mirrorz.mirrors.filter(mirror => !mirrors.some(item => item.cname === mirror.cname)),
  ];
  return result;
};
