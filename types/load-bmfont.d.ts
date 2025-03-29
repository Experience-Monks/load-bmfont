interface BMFont {
    chars: { [key: number]: any };
    common: { lineHeight: number };
    pages: string[];
    info: any;
  }
  
  declare function loadBMFont(url: string, callback: (err: Error | null, font: BMFont) => void): void;
  
  export default loadBMFont;
  