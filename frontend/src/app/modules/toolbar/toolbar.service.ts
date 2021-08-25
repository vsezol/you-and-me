import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToolbarAction } from '@modules/toolbar';

@Injectable()
export class ToolbarService {
  private _label = '';
  private _actions: ToolbarAction[] = [];
  private actions$: Subject<ToolbarAction> = new Subject<ToolbarAction>();

  public setActions(actions: ToolbarAction[]): void {
    this._actions = actions;
  }

  public getActions(): ToolbarAction[] {
    return this._actions;
  }

  public clearActions(): void {
    this._actions = [];
  }

  public emitAction(action: ToolbarAction): void {
    this.actions$.next(action);
  }

  public getActionsStream(): Observable<ToolbarAction> {
    return this.actions$.asObservable();
  }

  public setLabel(label: string): void {
    this._label = label;
  }

  public getLabel(): string {
    return this._label;
  }

  public clearLabel(): void {
    this._label = '';
  }
}
