import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface ToolbarAction {
  icon: string;
  name: string;
}

@Injectable()
export class ToolbarService {
  private _label = '';
  private _actions: ToolbarAction[] = [];
  private actions$: Subject<string> = new Subject<string>();

  public setActions(actions: ToolbarAction[]): void {
    this._actions = actions;
  }

  public getActions(): ToolbarAction[] {
    return this._actions;
  }

  public clearActions(): void {
    this._actions = [];
  }

  public emitAction(actionName: string): void {
    this.actions$.next(actionName);
  }

  public getActionsStream(): Observable<string> {
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
