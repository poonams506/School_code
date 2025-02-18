import { Injectable } from '@angular/core';
import { Theme, light, dark, defaultTheme } from './ThemeInterface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  private active: Theme;
  private availableThemes: Theme[] = [light, dark, defaultTheme];

  constructor() { }

  setDefaultTheme() {
    this.setActiveTheme(defaultTheme);
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }



}