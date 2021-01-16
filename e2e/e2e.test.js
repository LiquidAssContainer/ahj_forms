import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('E2E test of List Editor', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Expect succesful addition', async () => {
    await page.goto(baseUrl);

    await page.evaluate(() => {
      const listEditorSection = document.querySelector('.list-editor-section');
      listEditorSection.classList.remove('hidden');
    });

    const addBtn = await page.$('.list-editor_add-btn');
    await addBtn.click();

    // const form = await page.$('.form-modal_content');

    await page.type('#name', 'Samsung');
    await page.type('#price', '30000');

    await page.click('#submit');

    const tableText = await page.$eval('.buy-list_table', (elem) => elem.textContent);

    expect(tableText).toContain('Samsung');
    expect(tableText).toContain('30000');
  });

  test('Test first popup', async () => {
    await page.goto(baseUrl);

    await page.evaluate(() => {
      const popoverSection = document.querySelector('.popover-section');
      popoverSection.classList.remove('hidden');
    });

    const popoverSection = await page.$('.popover-section');

    const btn = await popoverSection.$('.popover-toggle');
    await btn.click();

    const text = await page.evaluate(() => document.querySelector('.popover').textContent);
    expect(text).toContain('Выйдите и зайдите');
    expect(text).toContain('Sed ut perspiciatis, unde omnis iste natus error');

    await page.mouse.click(1, 1); // нажатие вне границ попапа, чтобы он исчез
    const popover = await page.evaluate(() => document.querySelector('.popover'));
    expect(popover).toBe(null);
  });
});
