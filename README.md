# Wallchpaper

Change wallpaper after an adjustable time.

# Install

```
npm i -g wallchpaper
```

or 
```
yarn global add wallchpaper
```

## Settings

The settings are located at `~/.wallchpaper.js`.

Default settings are:

```js
module.exports = {
  config: {
    /**
     * Schedule in cron format
     */
    time: '0 */1 * * * *',

    /**
     * Include here the folders where the images will be searched. 
     * The supported extensions are ['.png', '.jpg', '.jpeg']
     * example:
     * folders: ['/home/user/Pictures']
     */
    folders: []
  }
}
```


## Features
* Change wallpaper
* Adjust time


## Comming features
* Random images from unsplash(or another image service)


## Supported Desktop Enviroments:
  - GNOME