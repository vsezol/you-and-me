import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PeerService } from 'src/app/modules/peer/services/peer.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private peerService: PeerService, private router: Router) {}

  isCreateAvailable$!: Observable<boolean>;

  ngOnInit(): void {
    this.isCreateAvailable$ = this.peerService.peerId$.pipe(
      map((peerId) => !!peerId)
    );
  }

  handleCreateChat(): void {
    this.router.navigate(['chat']);
  }
}
