// custom-tooltip.directive.ts
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class CustomToolTipDirective {
  @Input('appTooltip') tooltipText: string = '';
  // Pass any CSS props you like: { background: 'darkblue', color: '#fff', fontSize: '13px' }
  @Input() tooltipStyles: Partial<CSSStyleDeclaration> = {};
  // Optional: control where it shows
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  // NOT optional; use null when absent to avoid TS2532
  private tooltipElement: HTMLElement | null = null;

  constructor(
    private host: ElementRef<HTMLElement>,// reference of host element where directive is being applied
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.tooltipText || this.tooltipElement) return;

    const el = this.renderer.createElement('span') as HTMLElement;
    this.tooltipElement = el;

    this.renderer.appendChild(document.body, el);

    const defaults: Partial<CSSStyleDeclaration> = {
      position: 'absolute',
      zIndex: '1000',
      pointerEvents: 'none',
      background: '#333',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
    };

    // Apply defaults + custom styles
    const all = { ...defaults, ...this.tooltipStyles };
    Object.entries(all).forEach(([k, v]) => {
      if (v != null) this.renderer.setStyle(el, k, String(v));
    });

    this.renderer.setProperty(el, 'innerText', this.tooltipText);

    this.positionTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  // Optional: keep position accurate on scroll/resize
  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    this.positionTooltip();
  }

  private positionTooltip(): void {
    if (!this.tooltipElement) return;

    const rect = this.host.nativeElement.getBoundingClientRect();
    const spacing = 6;
    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case 'top':
        top = rect.top + window.scrollY - (this.tooltipElement.offsetHeight + spacing);
        left = rect.left + window.scrollX;
        break;
      case 'left':
        top = rect.top + window.scrollY;
        left = rect.left + window.scrollX - (this.tooltipElement.offsetWidth + spacing);
        break;
      case 'right':
        top = rect.top + window.scrollY;
        left = rect.right + window.scrollX + spacing;
        break;
      default: // 'bottom'
        top = rect.bottom + window.scrollY + spacing;
        left = rect.left + window.scrollX;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }
}
