
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Mostrar la imagen al cargar la página
    window.addEventListener('load', () => {
      const imgCard = document.querySelector('.img-card') as HTMLElement | null;
      if (imgCard) {
        imgCard.style.display = 'block';
      }
    });

    const jobCards = document.querySelectorAll('.job-card');
    const logo = document.querySelector('.logo') as HTMLElement | null;
    const jobLogos = document.querySelector('.job-logos') as HTMLElement | null;
    const jobDetailTitle = document.querySelector('.job-explain-content .job-card-title') as HTMLElement | null;
    const jobBg = document.querySelector('.job-bg') as HTMLElement | null;
    const wrapper = document.querySelector('.wrapper') as HTMLElement | null;
    const header = document.querySelector('.header') as HTMLElement | null;

    // Scroll para sombra en el header
    wrapper?.addEventListener('scroll', (e) => {
      if (!header) return;
      const target = e.target as HTMLElement;
      target.scrollTop > 30
        ? header.classList.add('header-shadow')
        : header.classList.remove('header-shadow');
    });

    // Botón modo oscuro/claro
    const toggleButton = document.querySelector('.dark-light') as HTMLElement | null;
    toggleButton?.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    // Tarjetas de trabajo
    jobCards.forEach((jobCard) => {
      jobCard.addEventListener('click', () => {
        const number = Math.floor(Math.random() * 10);
        const url = `https://unsplash.it/640/425?image=${number}`;
        if (jobBg) {
          jobBg.setAttribute('src', url);
        }

        const logoSvg = jobCard.querySelector('svg') as SVGSVGElement | null;
        const bg = logoSvg?.style.backgroundColor ?? '';
        if (jobBg) {
          jobBg.style.background = bg;
        }

        const title = jobCard.querySelector('.job-card-title') as HTMLElement | null;
        if (jobDetailTitle && title) {
          jobDetailTitle.textContent = title.textContent ?? '';
        }

        if (jobLogos && logoSvg) {
          jobLogos.innerHTML = logoSvg.outerHTML;
        }

        if (wrapper) {
          wrapper.classList.add('detail-page');
          wrapper.scrollTop = 0;
        }
      });
    });

    // Clic en logo para volver
    logo?.addEventListener('click', () => {
      if (wrapper && jobBg) {
        wrapper.classList.remove('detail-page');
        wrapper.scrollTop = 0;
        jobBg.style.background = '';
      }
    });

    // Menú lateral toggle
    document.querySelector('.menu-lateral')?.addEventListener('click', () => {
      document.body.classList.toggle('menu-active');
    });

    // Clics en tarjetas del menú lateral
    document.querySelectorAll('.menu-lateral .card').forEach((card) => {
      card.addEventListener('click', function (this: HTMLElement) {
        document.querySelectorAll('.menu-lateral .card').forEach(c => c.classList.remove('clicked'));
        this.classList.add('clicked');
      });
    });
  }

  showJobs(category: string): void {
    document.querySelectorAll('.job-container').forEach(container => {
      (container as HTMLElement).style.display = 'none';
    });

    const selectedContainer = document.getElementById(`${category}-jobs`);
    if (selectedContainer) {
      selectedContainer.style.display = 'flex';
    }

    const seeMoreButton = document.querySelector('.see-more') as HTMLElement | null;
    if (seeMoreButton) {
      seeMoreButton.style.display = 'inline-block';
    }

    const imgCard = document.querySelector('.img-card') as HTMLElement | null;
    if (imgCard) {
      imgCard.style.display = 'none';
    }
  }
  aplicarVacante(): void {
    console.log('Aplicaste a la vacante seleccionada.');
    // Aquí puedes redirigir, mostrar un modal o hacer cualquier acción deseada
    // Por ejemplo: this.router.navigate(['/aplicacion-exitosa']);
  }
}