import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  community: boolean = true;
  favorites: boolean = false;
  watched: boolean = false;

  constructor(private route: ActivatedRoute){}

  color(select: string): void{
    let community = <HTMLElement> document.querySelector(".header__list__community")
    let favorites = <HTMLElement> document.querySelector(".header__list__favorites")
    let watched = <HTMLElement> document.querySelector(".header__list__watched")

    if(select == "community"){
      this.community = true;
      this.favorites = false;
      this.watched = false
    }
    if(select == "favorites"){
      this.community = false;
      this.favorites = true;
      this.watched = false
    }

    if(select == "watched"){
      this.community = false;
      this.favorites = false;
      this.watched = true
    }

    if(this.community == true){
      community.style.color = 'rgb(255, 209, 2)';
      favorites.style.color = 'white';
      watched.style.color = 'white';
    }
    if(this.favorites == true){
      favorites.style.color = 'rgb(255, 209, 2)';
      community.style.color = 'white';
      watched.style.color = 'white';
    }
    if(this.watched == true){
      watched.style.color = 'rgb(255, 209, 2)';
      community.style.color = 'white';
      favorites.style.color = 'white';
    }

  }

  ngOnInit(): void {
  
  }

}
