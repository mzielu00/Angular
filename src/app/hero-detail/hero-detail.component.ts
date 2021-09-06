import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | undefined;

  heroes: Hero[] = [];

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location, private router: Router ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((res) => {this.hero = res;},
    (error) => {
      if (error instanceof HttpErrorResponse){
        if (error instanceof ErrorEvent){
          console.log("error");
        }
        else{
          switch(error.status){
            case 401:
              this.router.navigateByUrl("/error401");
              break;
            case 404:
              this.router.navigateByUrl("/error404");
              break;
            case 500:
              this.router.navigateByUrl("/error500");
              break;
          }
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(() => {this.goBack();},
      (error) => {
        if (error instanceof HttpErrorResponse){
          if (error instanceof ErrorEvent){
            console.log("error");
          }
          else{
            switch(error.status){
              case 401:
                this.router.navigateByUrl("/error401");
                break;
              case 404:
                this.router.navigateByUrl("/error404");
                break;
            }
          }
        }

      });
    }
  }
}
