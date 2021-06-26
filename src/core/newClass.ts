export class baseClass {
  constructor() {}
}

export abstract class Options<OPTIONS = any> extends baseClass {
  public options: OPTIONS;
  constructor(options: OPTIONS) {
    super();
    options = Object.assign({}, this.defaultOptions(), options);
  }
  protected abstract defaultOptions(): OPTIONS;
}

export abstract class Plugin<
  ROOT extends Pluginable,
  OPTIONS = any
> extends Options<OPTIONS> {
  public abstract setup(map: ROOT): void;
}

export abstract class Pluginable<
  OPTIONS = any,
  SELF extends Pluginable = any
> extends Options<OPTIONS> {
  #plugins = new Set<Plugin<SELF>>();

  public registerPlugin(plugin: Plugin<SELF>) {
    this.#plugins.add(plugin);
    return this;
  }

  public setupPlugins() {
    this.#plugins.forEach((p) => p.setup(this as unknown as SELF));
  }
}

export abstract class Handler<OPTIONS = any> extends Options<OPTIONS> {
  #enabled = false;

  public enable() {
    if (this.#enabled) return this;

    this.#enabled = true;
    this.addHooks();

    return this;
  }

  public disable() {
    if (!this.#enabled) return this;

    this.#enabled = false;
    this.removeHooks();
    return this;
  }

  public get enabled(): boolean {
    return this.#enabled;
  }

  protected abstract addHooks(): void;
  protected abstract removeHooks(): void;
}
