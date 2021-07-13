import {
  AfterViewInit,
  Component,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef;

  @Input() stream$!: Subject<MediaStream>;

  ngAfterViewInit(): void {
    this.stream$.subscribe((stream) => {
      this.addStreamToVideoElement(stream);
    });
  }

  addStreamToVideoElement(stream: MediaStream): void {
    this.video.nativeElement.muted = true;
    this.video.nativeElement.srcObject = stream;
  }

  handleLoadedMetadata(): void {
    this.video.nativeElement.play();
  }
}
