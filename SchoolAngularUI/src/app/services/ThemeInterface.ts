export interface Theme {
    name: string;
    properties: any;
}

export const defaultTheme: Theme = {
    name: "defaultTheme",
    properties: {
        "--body-bg-color": "#ebebed", //f3f3f9
        "--primary":"#0ab39c",
        "--primary-text":"#0ab39c",
        "--secondary":"#022e45",
        "--secondary-text":"#022e45",
        "--white-bg-color":"#ffffff",
        "--white-text-color":"#ffffff",
        "--dark-bg-color":"#444444",
        "--dark-text-color":"#444444",
        "--border-color":"#d7d7d7",
        //input
        "--input-bg-color":"#ffffff",
        "--input-border-color":"#d7d7d7",
        "--input-label-color":"#000",
        "--input-text-color":"#444444",
        "--readonly-input-bg-color":"#f5f5f5",
         // primary colors
         "--primary-btn-bg-color":"#0ab39c",
         "--primary-btn-border-color":"#0ab39c",
         "--primary-btn-text-color":"#ffffff",
           // secondary colors #405189
           "--secondary-btn-bg-color":"#022e45",
           "--secondary-btn-border-color":"#022e45",
           "--secondary-btn-text-color":"#ffffff",
         // success 
         "--success":"#3cba54",
         "--success-bg-color":"#3cba54",
         "--success-border-color":"#3cba54",
         "--success-text-color":"#3cba54",
         // danger
         "--danger":"#de3e4d",
         "--danger-bg-color":"#de3e4d",
         "--danger-text-color":"#de3e4d",
         "--danger-border-color":"#de3e4d",

         // light
         "--light-bg-color":"#d3d4d5",
         "--light-border-color":"#d3d4d5",

           // side menu #333269
           "--menu--wrapper-bg-color":"#022e45",
           "--menu-text-color":"#fff",
           "--menu-text-hover-color":"#dba13f",
           "--menu-icon-color":"#8990a2",
           "--menu-active-bg-color":"#fff",
           "--menu-active-text-color":"#ffffff",
           "--sub-menu-active-color":"#dba13f",
         
        "--title-color": "orange",
        "--button-bg-color": "#fff",
        "--button-border-color": "orange",
        "--button-text-color": "orange",
        "--magic-box-bg-color": "#ffffff",
        "--magic-box-text-color": "orange",

        "--user-accordion-header-bg":" #ebebed",
        // parent dashboard

        "--date-color":"#eb0fca",
        "--parent-name-color":"#1341c8",
        "--role-color":"#d34827",
        "--green-header-color":"#5ba66d",
        "--pink-header-color":"#f55779",
        "--nil-header-color":"#a157f5",
        "--orange-header-color":"#f5bd57",
        "--blue-english-color":"#0d98ba",
        "--blue-irish-color":"#5A4FCF",

        "--table-header-bg-color":"#eaf0f5"
    }
};

export const light: Theme = {
    name: "light",
    properties: {
        "--body-bg-color": "#add8e6",
        "--primary":"#0ab39c",
        "--secondary":"#022e45",
        "--white-bg-color":"#ffffff",
        "--white-text-color":"#ffffff",
        "--dark-bg-color":"#444444",
        "--dark-text-color":"#444444",
        "--border-color":"#d7d7d7",
        //input
        "--input-bg-color":"#add8e6",
        "--input-border-color":"#d7d7d7",
        "--input-label-color":"#212529",
        "--input-text-color":"#444444",
        // primary colors
        "--primary-btn-bg-color":"#add8e6",
        "--primary-btn-border-color":"#add8e6",
        "--primary-btn-text-color":"#ffffff",
        // secondary colors
        "--secondary-btn-bg-color":"#022e45",
        "--secondary-btn-border-color":"#022e45",
        "--secondary-btn-text-color":"#ffffff",
        // success 
        "--success":"#3cba54",
        "--success-bg-color":"#3cba54",
        "--success-border-color":"#3cba54",
        "--success-text-color":"#3cba54",
        // danger
        "--danger":"#e51b23",
        "--danger-bg-color":"#e51b23",
        "--danger-text-color":"#e51b23",
        "--danger-border-color":"#e51b23",

     // side menu
     "--menu--wrapper-bg-color":"#ffffff",
         "--menu-text-color":"#8990a2",
         "--menu-icon-color":"#8990a2",
         "--menu-active-bg-color":"#0ab39c",
         "--menu-active-text-color":"#ffffff",

        "--title-color": "#000080",
        "--button-bg-color": "#ADD8E6",
        "--button-border-color": "#ffffff",
        "--button-text-color": "#FFFFFF",
        "--magic-box-bg-color": "#ffffff",
        "--magic-box-text-color": "#483D8B"
    }
};

export const dark: Theme = {
    name: "dark",
    properties: {
        "--body-bg-color": "#000000",
        "--primary":"#0ab39c",
        "--secondary":"#022e45",
        "--white-bg-color":"#ffffff",
        "--white-text-color":"#ffffff",
        "--dark-bg-color":"#444444",
        "--dark-text-color":"#444444",
        "--border-color":"#d7d7d7",
        "--input-bg-color":"#ffffff",
        "--input-border-color":"#d7d7d7",
        "--input-label-color":"#212529",
        "--input-text-color":"#444444",
        // primary colors
        "--primary-btn-bg-color":"#444444",
        "--primary-btn-border-color":"#444444",
        "--primary-btn-text-color":"#ffffff",
        // secondary colors
        "--secondary-btn-bg-color":"#022e45",
        "--secondary-btn-border-color":"#022e45",
        "--secondary-btn-text-color":"#ffffff",
        // success 
        "--success":"#3cba54",
        "--success-bg-color":"#3cba54",
        "--success-border-color":"#3cba54",
        "--success-text-color":"#3cba54",
        // danger
        "--danger":"#e51b23",
        "--danger-bg-color":"#e51b23",
        "--danger-text-color":"#e51b23",
        "--danger-border-color":"#e51b23",

           // side menu
           "--menu--wrapper-bg-color":"#444444",
           "--menu-text-color":"#ffffff",
           "--menu-icon-color":"#ffffff",
           "--menu-active-bg-color":"#0ab39c",
           "--menu-active-text-color":"#ffffff",

        "--title-color": "#FFD700",
        "--button-bg-color": "#808080",
        "--button-border-color": "#FFFF00",
        "--button-text-color": "#FFFF00",
        "--magic-box-bg-color": "#2F4F4F",
        "--magic-box-text-color": "#DAA520"
    }
};