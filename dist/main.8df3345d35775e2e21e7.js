/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.scss":
/*!********************!*\
  !*** ./index.scss ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./data.js":
/*!*****************!*\
  !*** ./data.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   data: () => (/* binding */ data),
/* harmony export */   seasonIcons: () => (/* binding */ seasonIcons)
/* harmony export */ });
const data = [
  {
    id: 1, icon: 'sun', bg: 'summer', sound: 'summer',
  },
  {
    id: 2, icon: 'cloud-rain', bg: 'rainy', sound: 'rain',
  },
  {
    id: 3, icon: 'cloud-snow', bg: 'winter', sound: 'winter',
  },
];
const seasonIcons = {
  summer: 'sun',
  rain: 'cloud-rain',
  winter: 'cloud-snow',
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./index.scss");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./data.js");



let VOL = -1;
let isPaused = false;

const root = document.getElementById('app');
const weatherBlock = document.createElement('div');
const volumeChanger = document.createElement('input');
weatherBlock.className = 'weather-block';
volumeChanger.setAttribute('type', 'range');
volumeChanger.setAttribute('min', '0');
volumeChanger.setAttribute('max', '100');
volumeChanger.setAttribute('value', '100');

function changeIcon(sound, icon) {
  const season = document.getElementById(sound);
  season.removeChild(season.firstChild);
  const img = document.createElement('img');
  img.setAttribute('src', `./assets/icons/${icon}.svg`);
  season.append(img);
}
function createAudioEl(sound) {
  const audio = document.createElement('audio');
  const source = document.createElement('source');
  audio.setAttribute('loop', true);
  audio.id = 'audio';
  audio.setAttribute('name', sound);
  source.setAttribute('src', `./assets/sounds/${sound}.mp3`);
  source.setAttribute('type', 'audio/mpeg');
  if (VOL > -1) {
    audio.volume = VOL;
  }
  audio.append(source);
  weatherBlock.append(audio);
  audio.play();
}

function runSound(item) {
  const body = document.getElementById('body');
  body.style.backgroundImage = `url('./assets/${item.bg}-bg.jpg')`;
  const isAudioExist = document.getElementById('audio');

  if (isAudioExist) {
    if (isAudioExist.getAttribute('name') === item.sound) {
      if (isPaused) {
        isAudioExist.play();
        isPaused = false;
        changeIcon(item.sound, 'pause');
      } else {
        isAudioExist.pause();
        isPaused = true;
        changeIcon(item.sound, item.icon);
      }
    } else {
      changeIcon(isAudioExist.getAttribute('name'), _data__WEBPACK_IMPORTED_MODULE_1__.seasonIcons[isAudioExist.getAttribute('name')]);
      isPaused = false;
      isAudioExist.remove();
      createAudioEl(item.sound);
      changeIcon(item.sound, 'pause');
    }
  } else {
    createAudioEl(item.sound);
    changeIcon(item.sound, 'pause');
  }
}

function createContent(item) {
  const div = document.createElement('div');
  div.classList.add('weather-block-item');
  div.id = item.sound;
  div.addEventListener('click', () => runSound(item));
  div.style.backgroundImage = `url('./assets/${item.bg}-bg.jpg')`;
  const icon = document.createElement('img');
  icon.setAttribute('src', `./assets/icons/${item.icon}.svg`);
  div.append(icon);
  weatherBlock.append(div);
}
function changeVolume() {
  const newVolume = volumeChanger.value;
  const audio = document.getElementById('audio');
  VOL = newVolume / 100;
  if (audio) {
    audio.volume = newVolume / 100;
  }
}

_data__WEBPACK_IMPORTED_MODULE_1__.data.forEach(createContent);

volumeChanger.addEventListener('input', () => changeVolume());

root.append(weatherBlock);
root.append(volumeChanger);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44ZGYzMzQ1ZDM1Nzc1ZTJlMjFlNy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0U7Ozs7Ozs7VUNwQkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOc0I7QUFDcUI7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxLQUFLO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsTUFBTTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsUUFBUTtBQUN4RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sb0RBQW9ELDhDQUFXO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0EsNkNBQTZDLFVBQVU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBSTs7QUFFSjs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vaW5kZXguc2Nzcz9hYjJmIiwid2VicGFjazovLy8uL2RhdGEuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgZGF0YSA9IFtcbiAge1xuICAgIGlkOiAxLCBpY29uOiAnc3VuJywgYmc6ICdzdW1tZXInLCBzb3VuZDogJ3N1bW1lcicsXG4gIH0sXG4gIHtcbiAgICBpZDogMiwgaWNvbjogJ2Nsb3VkLXJhaW4nLCBiZzogJ3JhaW55Jywgc291bmQ6ICdyYWluJyxcbiAgfSxcbiAge1xuICAgIGlkOiAzLCBpY29uOiAnY2xvdWQtc25vdycsIGJnOiAnd2ludGVyJywgc291bmQ6ICd3aW50ZXInLFxuICB9LFxuXTtcbmNvbnN0IHNlYXNvbkljb25zID0ge1xuICBzdW1tZXI6ICdzdW4nLFxuICByYWluOiAnY2xvdWQtcmFpbicsXG4gIHdpbnRlcjogJ2Nsb3VkLXNub3cnLFxufTtcblxuZXhwb3J0IHtcbiAgZGF0YSxcbiAgc2Vhc29uSWNvbnMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vaW5kZXguc2Nzcyc7XG5pbXBvcnQgeyBkYXRhLCBzZWFzb25JY29ucyB9IGZyb20gJy4vZGF0YSc7XG5cbmxldCBWT0wgPSAtMTtcbmxldCBpc1BhdXNlZCA9IGZhbHNlO1xuXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuY29uc3Qgd2VhdGhlckJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCB2b2x1bWVDaGFuZ2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbndlYXRoZXJCbG9jay5jbGFzc05hbWUgPSAnd2VhdGhlci1ibG9jayc7XG52b2x1bWVDaGFuZ2VyLnNldEF0dHJpYnV0ZSgndHlwZScsICdyYW5nZScpO1xudm9sdW1lQ2hhbmdlci5zZXRBdHRyaWJ1dGUoJ21pbicsICcwJyk7XG52b2x1bWVDaGFuZ2VyLnNldEF0dHJpYnV0ZSgnbWF4JywgJzEwMCcpO1xudm9sdW1lQ2hhbmdlci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJzEwMCcpO1xuXG5mdW5jdGlvbiBjaGFuZ2VJY29uKHNvdW5kLCBpY29uKSB7XG4gIGNvbnN0IHNlYXNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNvdW5kKTtcbiAgc2Vhc29uLnJlbW92ZUNoaWxkKHNlYXNvbi5maXJzdENoaWxkKTtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGAuL2Fzc2V0cy9pY29ucy8ke2ljb259LnN2Z2ApO1xuICBzZWFzb24uYXBwZW5kKGltZyk7XG59XG5mdW5jdGlvbiBjcmVhdGVBdWRpb0VsKHNvdW5kKSB7XG4gIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcbiAgY29uc3Qgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG4gIGF1ZGlvLnNldEF0dHJpYnV0ZSgnbG9vcCcsIHRydWUpO1xuICBhdWRpby5pZCA9ICdhdWRpbyc7XG4gIGF1ZGlvLnNldEF0dHJpYnV0ZSgnbmFtZScsIHNvdW5kKTtcbiAgc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgYC4vYXNzZXRzL3NvdW5kcy8ke3NvdW5kfS5tcDNgKTtcbiAgc291cmNlLnNldEF0dHJpYnV0ZSgndHlwZScsICdhdWRpby9tcGVnJyk7XG4gIGlmIChWT0wgPiAtMSkge1xuICAgIGF1ZGlvLnZvbHVtZSA9IFZPTDtcbiAgfVxuICBhdWRpby5hcHBlbmQoc291cmNlKTtcbiAgd2VhdGhlckJsb2NrLmFwcGVuZChhdWRpbyk7XG4gIGF1ZGlvLnBsYXkoKTtcbn1cblxuZnVuY3Rpb24gcnVuU291bmQoaXRlbSkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHknKTtcbiAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcuL2Fzc2V0cy8ke2l0ZW0uYmd9LWJnLmpwZycpYDtcbiAgY29uc3QgaXNBdWRpb0V4aXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvJyk7XG5cbiAgaWYgKGlzQXVkaW9FeGlzdCkge1xuICAgIGlmIChpc0F1ZGlvRXhpc3QuZ2V0QXR0cmlidXRlKCduYW1lJykgPT09IGl0ZW0uc291bmQpIHtcbiAgICAgIGlmIChpc1BhdXNlZCkge1xuICAgICAgICBpc0F1ZGlvRXhpc3QucGxheSgpO1xuICAgICAgICBpc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICBjaGFuZ2VJY29uKGl0ZW0uc291bmQsICdwYXVzZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdWRpb0V4aXN0LnBhdXNlKCk7XG4gICAgICAgIGlzUGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgY2hhbmdlSWNvbihpdGVtLnNvdW5kLCBpdGVtLmljb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjaGFuZ2VJY29uKGlzQXVkaW9FeGlzdC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSwgc2Vhc29uSWNvbnNbaXNBdWRpb0V4aXN0LmdldEF0dHJpYnV0ZSgnbmFtZScpXSk7XG4gICAgICBpc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgaXNBdWRpb0V4aXN0LnJlbW92ZSgpO1xuICAgICAgY3JlYXRlQXVkaW9FbChpdGVtLnNvdW5kKTtcbiAgICAgIGNoYW5nZUljb24oaXRlbS5zb3VuZCwgJ3BhdXNlJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNyZWF0ZUF1ZGlvRWwoaXRlbS5zb3VuZCk7XG4gICAgY2hhbmdlSWNvbihpdGVtLnNvdW5kLCAncGF1c2UnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZW50KGl0ZW0pIHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyLWJsb2NrLWl0ZW0nKTtcbiAgZGl2LmlkID0gaXRlbS5zb3VuZDtcbiAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcnVuU291bmQoaXRlbSkpO1xuICBkaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnLi9hc3NldHMvJHtpdGVtLmJnfS1iZy5qcGcnKWA7XG4gIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsIGAuL2Fzc2V0cy9pY29ucy8ke2l0ZW0uaWNvbn0uc3ZnYCk7XG4gIGRpdi5hcHBlbmQoaWNvbik7XG4gIHdlYXRoZXJCbG9jay5hcHBlbmQoZGl2KTtcbn1cbmZ1bmN0aW9uIGNoYW5nZVZvbHVtZSgpIHtcbiAgY29uc3QgbmV3Vm9sdW1lID0gdm9sdW1lQ2hhbmdlci52YWx1ZTtcbiAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8nKTtcbiAgVk9MID0gbmV3Vm9sdW1lIC8gMTAwO1xuICBpZiAoYXVkaW8pIHtcbiAgICBhdWRpby52b2x1bWUgPSBuZXdWb2x1bWUgLyAxMDA7XG4gIH1cbn1cblxuZGF0YS5mb3JFYWNoKGNyZWF0ZUNvbnRlbnQpO1xuXG52b2x1bWVDaGFuZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4gY2hhbmdlVm9sdW1lKCkpO1xuXG5yb290LmFwcGVuZCh3ZWF0aGVyQmxvY2spO1xucm9vdC5hcHBlbmQodm9sdW1lQ2hhbmdlcik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=