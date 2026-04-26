const BLOCKED_PATHS = [
  /^\/\.git(?:\/|$)/i,
  /^\/\.htaccess$/i,
  /^\/README\.md$/i,
  /^\/wp-config\.php(?:\..*)?$/i,
  /\.(?:bak|old|orig|save|swp|swo|tmp|temp|dist|sql)(?:~)?$/i,
];

export async function onRequest(context) {
  const { pathname } = new URL(context.request.url);

  for (const pattern of BLOCKED_PATHS) {
    if (pattern.test(pathname)) {
      return new Response("Not Found", {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }
  }

  return context.next();
}
