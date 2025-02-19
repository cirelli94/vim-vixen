import { Lanthan } from 'lanthan';
import { WebDriver, By, until } from 'selenium-webdriver';

export default class FormOptionPage {
  private webdriver: WebDriver;

  constructor(lanthan: Lanthan) {
    this.webdriver = lanthan.getWebDriver();
  }

  async setBlacklist(nth: number, value: string): Promise<void> {
    let selector = '.form-blacklist-form-row > .column-url';
    let inputs = await this.webdriver.findElements(By.css(selector));
    if (inputs.length <= nth) {
      throw new RangeError('Index out of range to set a blacklist')
    }
    await inputs[nth].sendKeys(value);
    await this.webdriver.executeScript(`document.querySelectorAll('${selector}')[${nth}].blur()`);
  }

  async setSearchEngine(nth: number, name: string, url: string) {
    let selector = '.form-search-form-row > .column-name';
    let inputs = await this.webdriver.findElements(By.css(selector));
    if (inputs.length <= nth) {
      throw new RangeError('Index out of range to set a search engine')
    }
    await inputs[nth].sendKeys(name);
    await this.webdriver.executeScript(`document.querySelectorAll('${selector}')[${nth}].blur()`);

    selector = '.form-search-form-row > .column-url';
    inputs = await this.webdriver.findElements(By.css(selector));
    if (inputs.length <= nth) {
      throw new RangeError('Index out of range to set a search engine')
    }
    await inputs[nth].sendKeys(url);
    await this.webdriver.executeScript(`document.querySelectorAll('${selector}')[${nth}].blur()`);
  }

  async addBlacklist(): Promise<void> {
    let rows = await this.webdriver.findElements(By.css(`.form-blacklist-form-row`));
    let button = await this.webdriver.findElement(By.css('.form-blacklist-form .ui-add-button'))
    await button.click();
    await this.webdriver.wait(until.elementLocated(By.css(`.form-blacklist-form-row:nth-child(${rows.length + 1})`)));
  }

  async removeBlackList(nth: number): Promise<void> {
    let buttons = await this.webdriver.findElements(By.css('.form-blacklist-form-row .ui-delete-button'));
    if (buttons.length <= nth) {
      throw new RangeError('Index out of range to remove blacklist')
    }
    await buttons[nth].click()
  }

  async addSearchEngine(): Promise<void> {
    let rows = await this.webdriver.findElements(By.css(`.form-search-form-row > .column-name`));
    let button = await this.webdriver.findElement(By.css('.form-search-form > .ui-add-button'))
    await button.click();
    await this.webdriver.wait(until.elementLocated(By.css(`.form-search-form-row:nth-child(${rows.length + 1})`)));
  }

  async setDefaultSearchEngine(nth: number): Promise<void> {
    let radios = await this.webdriver.findElements(By.css('.form-search-form-row input[type=radio]'));
    if (radios.length <= nth) {
      throw new RangeError('Index out of range to set a default search engine');
    }
    await radios[nth].click();
  }
}
