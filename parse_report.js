const fs = require('fs');
const zlib = require('zlib');

const html = fs.readFileSync('./playwright-report/index.html', 'utf8');
const match = html.match(/window\.playwrightReportBase64\s*=\s*"([^"]+)"/);

if (match) {
  const buf = Buffer.from(match[1], 'base64');
  const jsonStr = zlib.unzipSync(buf).toString('utf8');
  const data = JSON.parse(jsonStr);

  const tests = [];

  function processSuite(suite) {
    if (suite.suites) suite.suites.forEach(processSuite);
    if (suite.specs) {
      suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
          test.results.forEach(result => {
            tests.push({
              title: `${spec.title}`,
              file: spec.file,
              duration: result.duration,
              status: result.status
            });
          });
        });
      });
    }
  }

  data.suites.forEach(processSuite);

  const totalDuration = tests.reduce((acc, t) => acc + t.duration, 0);

  tests.sort((a, b) => b.duration - a.duration);

  console.log(`Total Duration of Tests: ${totalDuration} ms\n`);
  console.log(`Test Results Breakdown:`);
  tests.forEach((t, i) => {
    const percentage = ((t.duration / totalDuration) * 100).toFixed(1);
    console.log(`${i + 1}. [${t.duration} ms] (${percentage}%) - ${t.title} (${t.status})`);
  });
}
