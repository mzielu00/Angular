import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  } 

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(
      (res) => {
        this.heroes = res;
      }, 
      (error) => {
        console.log(error);
      });
    ;
  }

  add(name: string): void{
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
    .subscribe((res) => {
      this.heroes.push(res);
    });
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe(() => this.getHeroes());

  }

} 
