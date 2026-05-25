import { Directive, ElementRef, Renderer2, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private router = inject(Router);

  @Input('appHighlight') linkUrl!: string;

  private sub!: Subscription;

  ngOnInit(): void {
    this.checkActive();

    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkActive();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private checkActive(): void {
    const currentUrl = this.router.url;
    // Highlight if URL matches
    const isActive = currentUrl === this.linkUrl || (this.linkUrl !== '/' && currentUrl.startsWith(this.linkUrl));
    
    if (isActive) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#2563eb');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#ffffff');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }
}
