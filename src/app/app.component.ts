import { Component, OnInit, ViewChild } from '@angular/core';
// import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  toggle!: boolean;
  compteur=0
  ngOnInit(): void {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  // Cette animation est celle qui s'execute lorsqu'on clique sur la AirPods en Entrée dans l'application
  init() {
    const TL = gsap.timeline();
    TL
      .to('.img_overlay1',{
        left: -400,
        duration: .1
      })
      .to('.img_overlay2',{
        bottom: -400,
        duration: .1
      },"<")
      .to('.circle_left_img2',{
        x:-28,
        duration: .8
      },"<")
      .to('.precedent',{
        y:200,
        duration: .8
      },"<")
      .to('.circle_left_img2',{
        rotate: '-90deg',
        delay:.8,
        left: '-120px',
        top:'-100px',
        x:180,
        y:10,
        duration: .8
      },"<")
      .to('.precedent',{
        y:180,
        duration: .8,
        ease:'back(8)'
      },"<")
      .to('.bg',{
        opacity:.5,
        duration: .8
      },"<")
      .to('.body_right',{
        opacity:1,
        x:'40px',
        duration: .5
      },"<")
      .to('.circle_left_img1,.circle_left_img3',{
        opacity:1,
        duration: .5
      },"<")
      .to('.body_right_block--text,.body_right_block--galery',{
        opacity:1,
        x:0,
        duration: .5
      },"<")
  }
  // Cette zone contient visiblement la partie de la gestion du dark/light Mode
  dark(){
    this.toggle = this.toggle ? false : true;
    if (this.toggle) { 
      console.log(this.toggle)
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
    gsap.to('.overlay_toggle',{
      x:32,
      duration: .5,
      ease: 'easeOut'
    })
    gsap.to('svg',{
      fill:'#fff',
      duration: .5,
      ease: 'easeOut'
    })
  }
  light(){
    this.toggle = this.toggle ? false : true;
    if (localStorage.getItem('color-theme') === 'light') {
      console.log(this.toggle)
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
    gsap.to('.overlay_toggle',{ 
      x:"*",
      duration: .5,
      ease: 'easeOut'
    })
    gsap.to('svg',{
      fill:'#000',
      duration: .5,
      ease: 'easeOut'
    })
  }


  // action qui s'execute lorsqu'on clique sur le bouton suivant
  // NB: ICI JE JOISI D'UTILISER UN COMPTEUR POUR PERMETTRE A MON BOUTON DE FAIRE LA DISTICTION SUR LES DIFFERENTES
  // ANIMATION QU'IL VAS APPLIQUER UNE AUTRE MANIERE DE FAIRE CONSISTE A UTILISER UN SERVICE ANGULAR GLOBALEMENT AFIN DE
  // DE METTRE A JOUR LE DIFFERENTIATEUR D'ETAT SUIVANT ET PRECEDENT APRES CHAQUE CLICK SUR LA BOUTON
  suivant(){
    const TL = gsap.timeline();
    if(this.compteur === 0 ){
      // appelle de la fonction d'animation de la seconde animation Airpods
      this.second();
      TL
        .to('.suivant',{
        display: 'block',
        x: '*',
        duration: 1,
        delay: .5,
        ease: 'back(2)'
      },"<")
      .to('.precedent',{
        x: 8,
        duration: 1,
        delay: .5,
        ease: 'back(3)'
      },"<")
      // ici j'increment le compteur pour lui faire comprendre qu'au prochain click il doit passer à l'animation suivante
      // J'ai utiliser le compteur pourque tout le monde puisse comprendre personnellement j'utiliserai un service car c'est plus 
      // facil et comprehenssive dans un projet
      this.compteur++
    }else{
      // ici le cas contraire c-a-d le compteur n'est plus à sa valeur initiale il à ete maj à la fin du block precedent, apres le premier click
      // donc forcement il faut 1 car sa valeur initiale est 0
      if(this.compteur === 1){
        this.third();
        TL
          .to('.suivant_text',{
            display: 'none',
            duration: .3,
            ease: 'power4.out',
          })
          .to('.precedent_text',{
            display: 'block',
            x:42,
            duration: .5,
            ease: 'power4.out',
          },"<")
          .to('.arrow_right',{
            x: '-100',
            duration: 1,
            ease: 'power4.out',
          },"<")
          .to('.suivant',{
            x: '70px',
            duration: 1,
            display: 'none',
            ease: 'power4.out',
          },"<")
          this.compteur++;
      }
      // ici j'arrive à la dernire animation de la zone galerie(troisieme AirPods) donc je remet le compteur à sa valeur initiale 
      if(this.compteur === 2){
        this.compteur = 0;
      }
    }
  }
  // action qui s'execute lorssqu'on clique sur le bouton precedent 
  // et je fais le meme process que precedement je regarde la valeur de mon compteur pour appliquer l'animation qui vas avec
  // à la suite de sa je met toujours le compteur à jour apres modification
  precedent(){
    const TL = gsap.timeline();
    if(this.compteur === 1){
      this.first();
      TL
          .to('.suivant_text',{
            display: 'block',
            duration: .3,
            x:'*',
            ease: 'power4.out',
          })
          .to('.precedent_text',{
            display: 'none',
            duration: .5,
            ease: 'power4.out',
          },"<")
          .to('.arrow_right',{
            x: '*',
            duration: 1,
            ease: 'power4.out',
          },"<")
          .to('.suivant',{
            x: '70px',
            duration: 1,
            display: 'none',
            ease: 'power4.out',
          },"<")
          this.compteur--;
    }
  }
  // fonction qui s'execute lorsqu'on clique sur la premiere image Airpods
  // ces fonctions first second et third font pratiquement le meme process
  // je fais tourner la div parent(en relative) et ses enfants(img en absolute) suivent l'animation
  // automatiquement et pour le reste je joue sur le scale et la rotation
  first(){
    this.compteur =1
    const TL = gsap.timeline();
    TL
      .to('.circle_left',{
        rotate: 90,
        duration: 1,
        ease: 'power2.out'
      })
      .to('.circle_left_img2',{
        rotate: -90,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.circle_left_img1',{
        rotate: 15,
        bottom: 200,
        scale: .3,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.circle_left_img3',{
        rotate: 10,
        bottom: -200,
        scale: .3,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.line_overlay',{
        xPercent: 0,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.suivant',{
        display: 'none',
        x: '*',
        duration: .1,
        delay: .5,
        ease: 'back(2)'
      },"<-1")
      .to('.precedent',{
        x: 8,
        duration: .1,
        delay: .5,
        ease: 'back(2)'
      },"<")
      .to('.precedent_text',{
        display: 'none',
        duration: .1,
        delay: .5,
        ease: 'back(2)'
      },"<-1")
      .to('.suivant_text',{
        display: 'block',
        duration: .1,
        delay: .5,
        ease: 'back(3)'
      },"<-1")
  }
  // fonction qui s'execute lorsqu'on clique sur la deuxieme image Airpods
  second(){
    const TL = gsap.timeline();
    TL
      .to('.circle_left',{
        rotate: -10,
        duration: 1,
        ease: 'power2.out'
      })
      .to('.circle_left_img2',{
        rotate: 90,
        scale: .3,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.circle_left_img3',{
        rotate: 90,
        bottom: -200,
        scale: .3,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.circle_left_img1',{
        width: '550px',
        height: '500px',
        rotate: 10,
        scale:'1',
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.line_overlay',{
        xPercent: 105,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.precedent_text',{
        display: 'none',
        x: '*',
        duration: .1,
        delay: .5,
        ease: 'back(2)'
      },"<-1")
      .to('.arrow_right',{
        x: 8,
        duration: .5,
        delay: .5,
        ease: 'power4.out'
      },"<-.5")
      .to('.suivant_text',{
        display: 'block',
        x: '*',
        duration: .1,
        delay: .5,
        ease: 'back(2)'
      },"<")
      .to('.suivant',{
        display: 'block',
        x: -8,
        duration: .1,
        delay: .5,
        ease: 'back(5)'
      },"<")

  }
  // fonction qui s'execute lorsqu'on clique sur la troisieme image Airpods
  third(){
    // this.compteur--;
    const TL = gsap.timeline();
    TL
      .to('.circle_left',{
        rotate: -90,
        duration: 1,
        ease: 'power2.out'
      })
      .to('.circle_left_img1',{
        rotate: 190,
        scale: .3,
        top:0,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.circle_left_img3',{
        width: '550px',
        height: '500px',
        rotate: 90,
        scale:'1',
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.circle_left_img2',{
        rotate: -90,
        scale: .3,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.line_overlay',{
        xPercent: 210,
        duration: 1,
        ease: 'power2.out'
      },"<")
      .to('.suivant',{
        display: 'none',
        x: '*',
        duration: .1,
        delay: .5,
        ease: 'back(2)'
      },"<-1")
      .to('.precedent_text',{
        display: 'block',
        x: 8,
        duration: .1,
        delay: .5,
        ease: 'back(3)'
      },"<")
      .to('.suivant_text',{
        display: 'none',
        duration: .1,
        delay: .5,
        ease: 'back(3)'
      },"<-1")
  }
  
}
