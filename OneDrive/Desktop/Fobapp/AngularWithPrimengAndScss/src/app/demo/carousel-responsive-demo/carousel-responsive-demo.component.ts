import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../Domain/product';

@Component({
  selector: 'app-carousel-responsive-demo',
  templateUrl: './carousel-responsive-demo.component.html',
  styleUrl: './carousel-responsive-demo.component.scss'
})
export class CarouselResponsiveDemoComponent {
  products: Product[] | undefined;

  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
      this.productService.getProductsSmall().then((products) => {
          this.products = products;
      });

      this.responsiveOptions = [
          {
              breakpoint: '1400px',
              numVisible: 3,
              numScroll: 3
          },
          {
              breakpoint: '1220px',
              numVisible: 2,
              numScroll: 2
          },
          {
              breakpoint: '1100px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
      }
  }
}
