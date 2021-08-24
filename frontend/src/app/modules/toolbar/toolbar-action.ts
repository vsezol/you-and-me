export interface ToolbarAction {
  readonly icon: string;
  readonly name: string;
  readonly disabled?: boolean;
  disable(): void;
  enable(): void;
}

export class DefaultToolbarAction implements ToolbarAction {
  private readonly _icon: string;
  private readonly _name: string;
  private _disabled: boolean;

  public get icon() {
    return this._icon;
  }

  public get name() {
    return this._name;
  }

  public get disabled() {
    return this._disabled;
  }

  constructor({
    icon,
    name,
    disabled = false,
  }: Pick<ToolbarAction, 'icon' | 'name' | 'disabled'>) {
    this._icon = icon;
    this._name = name;
    this._disabled = disabled;
  }

  public disable(): void {
    this._disabled = true;
  }

  public enable(): void {
    this._disabled = false;
  }
}
