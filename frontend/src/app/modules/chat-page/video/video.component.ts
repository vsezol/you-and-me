import { OnDestroy } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') video!: ElementRef;

  @Input() stream$!: Subject<MediaStream>;

  destroyed$: Subject<void> = new Subject();

  ngAfterViewInit(): void {
    this.stream$.pipe(takeUntil(this.destroyed$)).subscribe((stream) => {
      this.addStreamToVideoElement(stream);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addStreamToVideoElement(stream: MediaStream): void {
    this.video.nativeElement.muted = true;
    this.video.nativeElement.srcObject = stream;
  }

  handleLoadedMetadata(): void {
    this.video.nativeElement.play();
  }
}
