console.log("cl test");

// 获取title元素
const title = document.querySelector('#title');
const head_title = document.querySelector('#head_title');
// 监听滚动函数
// 提取滚动事件处理函数
function handleScroll() {
  // 获取滚动距离
  const scrollDistance = window.scrollY;

  // 滚动距离超过设定值(px)则执行操作
  if (scrollDistance > 64) {
    title.classList.add('visible');
    head_title.classList.add('hidden');
  } else {
    title.classList.remove('visible');
    head_title.classList.remove('hidden');
  }
}
// 监听滚动
window.addEventListener('scroll', handleScroll);
// 页面加载完成后手动触发一次滚动事件处理函数
window.onload = function() {
  handleScroll();
};



// 鼠标进入二层时禁用*一层滚动
// 这里将全局禁用滚动
// const secondFloorBox = document.querySelector('#second_floor_box');
// secondFloorBox.addEventListener('wheel', function(event) {
//   event.preventDefault(); // 阻止默认滚动行为
//   event.stopPropagation(); // 阻止事件冒泡
// });




let cycle_img = [
  {url: 'File/img/test_1.jpg', text: '努 力 做 个 人', r: 108, g: 81, b: 81, a: 1}, 
  {url: 'File/img/test_2.jpg', text: '虽然但是..', r: 150, g: 0, b: 0, a: 1}, 
  {url: 'File/img/test_3.jpg', text: '小草说..', r: 0, g: 150, b: 0, a: 1}, 
  {url: 'File/img/test_4.jpg', text: '上西天~', r: 0, g: 100, b: 0, a: 1}, 
  {url: 'File/img/test_5.jpg', text: '向前一小步', r: 135, g: 62, b: 59, a: 1}, 
  {url: 'File/img/test_6.jpg', text: '感谢配合~', r: 50, g: 50, b: 50, a: 1}
  ]

let cycle_num = 1
const cycle_img_Element = document.querySelector('.cycle_img');
const cycle_img_top_Element = document.querySelector('#cycle_img_top');
const cycle_img_top_in_Element = document.querySelector('#cycle_img_top_in');
const cycle_img_top_shadow_Element = document.querySelector('#cycle_img_top_shadow');
const cycle_img_bottom_Element = document.querySelector('#cycle_img_bottom');
const cycle_img_text_Element = document.querySelector('#cycle_img_text');
const cycle_img_point_Elements = document.querySelectorAll('#cycle_img_points dd');
const cycle_img_r_button_Element = document.querySelector('#cycle_img_r_button');
const cycle_img_l_button_Element = document.querySelector('#cycle_img_l_button');




// 更新轮播图内容
function updateCarousel() {
  const currentSlide = cycle_img[cycle_num - 1];
  cycle_img_top_in_Element.src = currentSlide.url;
}
updateCarousel();




// 更换图片时闪烁
function updateCarousel_visual() {
  cycle_img_top_Element.style.boxShadow = '0px 0px 10px 2px rgba(255, 255, 200, 0.42)';
  cycle_img_top_in_Element.style.filter = 'blur(8px) brightness(200%) contrast(300%) saturate(180%) opacity(0%)';
  setTimeout(() => {
    cycle_img_top_in_Element.style.filter = 'blur(0px) brightness(100%) contrast(100%) saturate(100%) opacity(100%)';
    cycle_img_top_Element.style.boxShadow = '0px 0px 10px 2px rgba(255, 255, 200, 0)';
  }, 400); // 恢复延迟0.4秒(闪烁0.3秒)
}




// 底栏跟随切换
function updateCarousel_text_color_and_points() {
  const currentSlide = cycle_img[cycle_num - 1];
  cycle_img_text_Element.textContent = currentSlide.text;
  cycle_img_Element.style.setProperty('--color-r', currentSlide.r);
  cycle_img_Element.style.setProperty('--color-g', currentSlide.g);
  cycle_img_Element.style.setProperty('--color-b', currentSlide.b);
  cycle_img_Element.style.setProperty('--color-a', currentSlide.a);
  cycle_img_point_Elements.forEach((point, index) => {
    if (index === cycle_num - 1) {
      point.classList.add('cycle_img_high_light_point');
    } else {
      point.classList.remove('cycle_img_high_light_point');
    }
  });
}
updateCarousel_text_color_and_points();




// 切换方法集成
function updateCycleImg() {
  updateCarousel_visual();
  updateCarousel_text_color_and_points();
  setTimeout(updateCarousel, 300); // 延迟0.3秒更新轮播图
}




// 按钮切换
cycle_img_r_button_Element.addEventListener('click', () => {
  clearTimeout(cycle_timeId); // 清除当前的定时器
  if (cycle_num < cycle_img.length) {
    cycle_num++;
  } else {
    cycle_num = 1;
  }
  updateCycleImg()
});
cycle_img_l_button_Element.addEventListener('click', () => {
  clearTimeout(cycle_timeId); // 清除当前的定时器
  if (cycle_num > 1) {
    cycle_num--;
  } else {
    cycle_num = cycle_img.length;
  }
  updateCycleImg()
});




// 选择切换
cycle_img_point_Elements.forEach((point, index) => {
  point.addEventListener('click', () => {
    // 检查是否已经包含 cycle_img_high_light_point 类
    if (!point.classList.contains('cycle_img_high_light_point')) {
      cycle_num = index + 1;
      updateCycleImg()
    }
  });
});




// 自动切换
let cycle_timeId;

function startCarousel() {
  cycle_timeId = setInterval(() => {
    if (cycle_num < cycle_img.length) {
      cycle_num++;
    } else {
      cycle_num = 1;
    }
    updateCarousel_visual(); // 先执行视觉效果
    // 我也忘记当初为什么要写400了 25/04/07 21:38 来自自己
    setTimeout(() => {
      updateCarousel_text_color_and_points(); // 延迟0.4秒更新文本和点
      updateCarousel(); // 延迟0.4秒更新轮播图
    }, 400);
    console.log('setInterval循环')
  }, 8000);
};
startCarousel();

// 鼠标进入则暂停自动切换
cycle_img_Element.addEventListener('mouseenter', () => {
  clearInterval(cycle_timeId);
  console.log('cycle_timeId停止');
});
cycle_img_Element.addEventListener('mouseleave', () => {
  startCarousel();
  console.log('cycle_timeId重新启动');
});




// 触摸切换
let touch_startX = 0;
let touch_startY = 0;

cycle_img_top_shadow_Element.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  touch_startX = touch.clientX;
  touch_startY = touch.clientY;
  console.log('touchstart', touch_startX, touch_startY); // 添加调试信息
});
cycle_img_top_shadow_Element.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  const endX = touch.clientX;
  const endY = touch.clientY;
  const deltaX = touch_startX - endX;
  const deltaY = touch_startY - endY;
  console.log('touchend', endX, endY, deltaX, deltaY); // 添加调试信息
  
  // 滑动至少大于20单位
  if(Math.abs(deltaX) > 20) {
    // 判断滑动方向
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // 从右往左滑动
        console.log('从右往左滑动'); // 添加调试信息
        clearTimeout(cycle_timeId); // 清除当前的定时器
        if (cycle_num < cycle_img.length) {
          cycle_num++;
        } else {
          cycle_num = 1;
        }
        updateCycleImg()
      } else {
        // 从左往右滑动
        console.log('从左往右滑动'); // 添加调试信息
        clearTimeout(cycle_timeId); // 清除当前的定时器
        if (cycle_num > 1) {
          cycle_num--;
        } else {
          cycle_num = cycle_img.length;
        }
        updateCycleImg()
      }
    }
  }
});




// 拖拽切换
let isDragging = false;
let mouse_startX = 0;
let mouse_startY = 0;

cycle_img_top_shadow_Element.addEventListener('mousedown', (event) => {
  isDragging = true;
  mouse_startX = event.clientX;
  mouse_startY = event.clientY;
  console.log('mousestart', mouse_startX, mouse_startY); // 添加调试信息
});
cycle_img_top_shadow_Element.addEventListener('mousemove', (event) => {
  if (isDragging) {
    // 记录当前鼠标位置
    const currentX = event.clientX;
    const currentY = event.clientY;
  }
});
cycle_img_top_shadow_Element.addEventListener('mouseup', (event) => { 
  if (isDragging) {
    isDragging = false;
    const endX = event.clientX;
    const endY = event.clientY;
    const deltaX = mouse_startX - endX;
    const deltaY = mouse_startY - endY;
    console.log('mouseend', endX, endY, deltaX, deltaY); // 添加调试信息

    // 拖拽至少大于20单位
    if(Math.abs(deltaX) > 20) {
      // 判断拖拽方向
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          // 从右往左拖拽
          console.log('从右往左拖拽'); // 添加调试信息
          clearTimeout(cycle_timeId); // 清除当前的定时器
          if (cycle_num < cycle_img.length) {
            cycle_num++;
          } else {
            cycle_num = 1;
          }
          updateCycleImg()
        } else {
          // 从左往右拖拽
          console.log('从左往右拖拽'); // 添加调试信息
          clearTimeout(cycle_timeId); // 清除当前的定时器
          if (cycle_num > 1) {
            cycle_num--;
          } else {
            cycle_num = cycle_img.length;
          }
          updateCycleImg()
        }
      }
    }
    
  }
});




// 动态监听窗口宽度决定显示6个或4个内容, 显示4个内容时不显示最后2个
function adjustInBoxTopRightIn() {
  const inBoxTopRightIn = document.getElementById('in_box_top_right_in');
  const spans = inBoxTopRightIn.getElementsByClassName('in_box_top_right_in_span');
  const lastTwoSpans = Array.from(spans).slice(-2);

  if (window.innerWidth <= 1399.9) {
    lastTwoSpans.forEach(span => {
      span.style.display = 'none';
    });
  } else {
    lastTwoSpans.forEach(span => {
      span.style.display = 'block';
    });
  }
}
adjustInBoxTopRightIn();
// 监听窗口大小变化
window.addEventListener('resize', adjustInBoxTopRightIn);




// JavaScript 动态截断字符_文字超出盒子宽度时换行, 并且只允许文字存在两行, 超出的部分用省略号表示
document.querySelectorAll('content_box_title').forEach(element => {
  const lines = element.innerText.split('\n');
    if (lines.length > 2) {
        element.innerText = lines.slice(0, 2).join('\n') + '..';
    }
});




// 还原.bottom_div_content_left_blur的属性为原始值
function restore_bottom_div_content_left_blur() {
  document.querySelectorAll('.bottom_div_content_left_blur').forEach(leftBlurElement => {
    leftBlurElement.style.width = '6.8%'; // 原始值为6.8%
      // leftBlurElement.style.zIndex = '8';
      // leftBlurElement.style.pointerEvents = 'auto';
    leftBlurElement.style.transitionTimingFunction = 'ease-in-out'; // 原始值为ease-in-out
  });
}
// 还原.bottom_div_content_left_text的属性为原始值
function restore_bottom_div_content_left_text() {
  document.querySelectorAll('.bottom_div_content_left_text').forEach(leftBlurTextElement => {
    leftBlurTextElement.style.opacity = '100%'; // 原始值为100%
  });
}


// 添加active类模拟强制:active(:active 伪类是浏览器自动管理的, 无法通过JS直接强制设置) 25/03/30 01:37 来自自己
// 为每个.bottom_div_in添加点击事件监听器
document.querySelectorAll('.bottom_div_in').forEach(item => {
  item.addEventListener('click', function(event) {
    // 阻止事件冒泡
    event.stopPropagation();
    // 移除所有.bottom_div_in的active类
    document.querySelectorAll('.bottom_div_in').forEach(div => {
      div.classList.remove('active');
    });
    // 为当前点击的.bottom_div_in添加active类
    this.classList.add('active');

    // JS的神奇小特性似乎导致不能再追加新类所以只能绕个弯路加个子元素哈哈哈我真是天才
    // 移除所有.bottom_div_in的.has_active子元素
    document.querySelectorAll('.bottom_div_in .has_active').forEach(div => {
      div.remove();
    });
    // 创建一个新的.has_active元素
    const hasActiveElement = document.createElement('div');
    hasActiveElement.classList.add('has_active');
    // 将.has_active元素添加到当前点击的.bottom_div_in中
    this.querySelector('.bottom_div_content_box').appendChild(hasActiveElement);

    // 为.has_active元素添加点击事件监听器
    hasActiveElement.addEventListener('click', function(event) {
      // 阻止事件冒泡
      event.stopPropagation();
      // 定义元素属性常量
      const leftBlurElement = this.closest('.bottom_div_content_box').querySelector('.bottom_div_content_left_blur');
      const leftBlurTextElement = this.closest('.bottom_div_content_box').querySelector('.bottom_div_content_left_blur').querySelector('.bottom_div_content_left_text_box').querySelector('.bottom_div_content_left_text');
      const secondFloorCoverBoxElement = document.querySelector('#second_floor_cover_box');
      const secondFloorCoverImgElement = document.querySelector('#second_floor_cover_img');
      const secondFloorCoverTextBoxElement = document.querySelector('#second_floor_cover_text_box');
      const secondFloorCoverTextTitleElement = document.querySelector('#second_floor_cover_text_title');
      const secondFloorCoverTextDescriptionElement = document.querySelector('#second_floor_cover_text_description');
      const secondFloorElement = document.querySelector('#second_floor');

      // 如果恰是上次被点击的块则直接移动二层
      if(hasActiveElement.classList.contains('active_1')) {
        // *似乎是由于在首次进入二层时就已经给返回按钮(#first_section_second_floor)设定了功能, 所以无需在别处重复设定
        // 左模糊延伸
        leftBlurElement.style.width = '100%';
        // leftBlurElement.style.zIndex = '49';
        // leftBlurElement.style.pointerEvents = 'none';
        leftBlurElement.style.transitionTimingFunction = 'cubic-bezier(.53,0,.9,.58)';
        leftBlurTextElement.style.opacity = '0%';
        setTimeout(() => {
          // 直接移动二层
          // 注意延时和secondFloorCoverBoxElement一致(为了感官效果而非运行或者逻辑)
          secondFloorElement.style.transition = '1s';
          secondFloorElement.style.transitionTimingFunction = 'cubic-bezier(.09,.53,.17,1)';
          secondFloorElement.style.transform = 'translateY(-100%)';
        }, 900);
      }else {
        // 为.has_active元素添加active_1类
        // 下面这行现在没啥用了
        // 《本程序依靠该bug运行》
        // 草草草现在还真又有用了(好几天后写下)
        // 踏马的这就是所谓的升级接口吗
        // 踏马的给过去的自己磕个头
        this.classList.add('active_1');

        // 修改.bottom_div_content_left_blur及text的属性
        if (leftBlurElement) {
          // 左模糊延伸
          leftBlurElement.style.width = '100%';
          // leftBlurElement.style.zIndex = '49';
          // leftBlurElement.style.pointerEvents = 'none';
          leftBlurElement.style.transitionTimingFunction = 'cubic-bezier(.53,0,.9,.58)';
          leftBlurTextElement.style.opacity = '0%';

          // 覆盖层进入
          secondFloorCoverBoxElement.style.transition = 'all 2.16s cubic-bezier(.04,.99,.57,1) 0.9s';
          secondFloorCoverBoxElement.style.transform = 'translateY(-100%)';
          secondFloorCoverTextBoxElement.style.transition = 'all 2.16s cubic-bezier(.04,.99,.57,1) 1s';;
          secondFloorCoverTextBoxElement.style.transform = 'translateY(-100%)';
          // secondFloorCoverTextBoxElement.style.backgroundColor = 'rgba(255, 136, 0, 0.3)';
          // secondFloorCoverTextTitleElement.style.opacity = '100%';
          // secondFloorCoverTextDescriptionElement.style.opacity = '100%';
          secondFloorCoverTextDescriptionElement.style.transition = 'all 2.16s cubic-bezier(.04,.99,.57,1) 1.2s';;
          secondFloorCoverTextDescriptionElement.style.transform = 'translateY(0)';

          // 覆盖层内容与当前点击的盒子的元素一致
          console.log(this);
          // 获取当前点击的盒子的元素
          const thisBackgroundImageElement = this.closest('.bottom_div_content_box').querySelector('.bottom_div_content_background');
          const thisTextTitleElement = this.closest('.bottom_div_content_box').parentNode.querySelector('.bottom_div_title_box').querySelector('.bottom_div_title');
          const thisTextTitleDescriptionElement = this.closest('.bottom_div_content_box').parentNode.querySelector('.bottom_div_title_box').querySelector('.bottom_div_title_description');
          console.log(thisBackgroundImageElement);
          console.log(thisTextTitleElement);
          console.log(thisTextTitleDescriptionElement);
          if (thisBackgroundImageElement) {
              // *获取当前点击的盒子的元素的最终属性
              const thisBackgroundImageStyle = window.getComputedStyle(thisBackgroundImageElement);
              if (thisBackgroundImageStyle) {
                // 若不为空则将当前点击的盒子的元素的内容填入覆盖层
                secondFloorCoverImgElement.style.transition = '0s';
                secondFloorCoverImgElement.style.backgroundImage = thisBackgroundImageStyle.backgroundImage;
                secondFloorCoverTextTitleElement.src = thisTextTitleElement.src;
                // 若介绍为两行则填充单行版本_id及判断自己加
                if (thisTextTitleDescriptionElement && thisTextTitleDescriptionElement.id === 'bottom_div_in_3_doubleLineDescriptionWarning') {
                  secondFloorCoverTextDescriptionElement.src = 'File/img/billows/billows_description_singleLine.svg';
                  console.log(thisTextTitleDescriptionElement.src);
                } else if (thisTextTitleDescriptionElement) {
                  secondFloorCoverTextDescriptionElement.src = thisTextTitleDescriptionElement.src;
                  console.log(thisTextTitleDescriptionElement.src);
                } else {
                  // 处理 thisTextTitleDescriptionElement 为 null 的情况
                  console.warn('thisTextTitleDescriptionElement is null, skipping');
                }
                console.log(thisBackgroundImageStyle.backgroundImage);
                console.log(thisTextTitleElement.src);
              }
          }


          // 覆盖层退出_定时器
          const coverDisappearTransitionTime = '1.2s';
          const coverDisappearTimingFunction = 'cubic-bezier(.65,-0.01,.81,.41)';
          const coverDisappearDelayTime = 5000;
          const coverDisappearDelayTimeDelay = 200;
          setTimeout(() => {
            secondFloorCoverTextBoxElement.style.transition = coverDisappearTransitionTime;
            secondFloorCoverTextBoxElement.style.transitionTimingFunction = coverDisappearTimingFunction;
            secondFloorCoverTextBoxElement.style.opacity = '0%';
            secondFloorElement.style.transform = 'translateY(-100%)';
          }, coverDisappearDelayTime);
          setTimeout(() => {
            secondFloorCoverImgElement.style.transition = coverDisappearTransitionTime;
            secondFloorCoverImgElement.style.transitionTimingFunction = coverDisappearTimingFunction;
            secondFloorCoverImgElement.style.height = '0';
          }, coverDisappearDelayTime + coverDisappearDelayTimeDelay);
          setTimeout(() => {
            secondFloorCoverBoxElement.style.transition = '0s';
            secondFloorCoverBoxElement.style.transform = 'translateY(0)';
            secondFloorCoverImgElement.style.transition = '0s';
            secondFloorCoverImgElement.style.height = '100%';
            clearInterval(cycle_timeId);
            console.log('进入二层, cycle_timeId停止');
          }, coverDisappearDelayTime + coverDisappearDelayTimeDelay + 1200); // 1200为coverDisappearTransitionTime, 变量原始格式不同所以不能直接相加
          // 返回按钮还原属性_还没写_可能还有属性改变而未在此列出(晚些时候写下)(记得再检查检查, 不过要是能跑就先不管[更晚些时候写下])
          // *似乎是由于在首次进入二层时就已经给返回按钮(#first_section_second_floor)设定了功能, 所以无需在别处重复设定
          // secondFloorCoverTextBoxElement的过渡时间似乎有未知bug_应该直接还原为2.16s(原始值)就行
          // secondFloorCoverTextBoxElement已修改逻辑: 初始过渡为0, 仅在需要时修改时长 25/04/07 23:27 来自自己
          const firstSectionSecondFloor = document.querySelector('#first_section_second_floor');
          firstSectionSecondFloor.addEventListener('click', function() {
            // 一层左模糊还原延迟100
            secondFloorElement.style.transition = '1s';
            // secondFloorElement.style.transitionTimingFunction = 'cubic-bezier(.09,.41,.33,.99)';
            secondFloorElement.style.transitionTimingFunction = 'cubic-bezier(.11,.42,.49,1.23)';
            // 一层左模糊还原延迟500
            // secondFloorElement.style.transition = '1s';
            // secondFloorElement.style.transitionTimingFunction = 'cubic-bezier(.76,.07,.88,.24)';
            secondFloorElement.style.transform = 'translate(100%, -100%)';

            secondFloorCoverTextBoxElement.style.transition = '0s';
            secondFloorCoverTextBoxElement.style.transform = 'translateY(-90%)';
            secondFloorCoverTextBoxElement.style.opacity = '100%';

            secondFloorCoverTextDescriptionElement.style.transition = '0s';;
            secondFloorCoverTextDescriptionElement.style.transform = 'translateY(80%)';

            setTimeout(() => {
              secondFloorElement.style.transition = '0s';
              restore_bottom_div_content_left_blur();
              restore_bottom_div_content_left_text();
              startCarousel();
              console.log('退出二层, cycle_timeId重新启动');
            }, 100);
          });

          // // secondFloorCoverBoxElement.style.transition = '0s';
          // // secondFloorCoverBoxElement.style.transform = 'translateY(0)';

          // secondFloorCoverTextBoxElement.style.transition = '0s';
          // secondFloorCoverTextBoxElement.style.transform = 'translateY(-90%)';
          // secondFloorCoverTextBoxElement.style.opacity = '100%';

          // secondFloorCoverTextDescriptionElement.style.transition = '0s';;
          // secondFloorCoverTextDescriptionElement.style.transform = 'translateY(80%)';

          // // secondFloorCoverImgElement.style.transition = '0s';
          // // secondFloorCoverImgElement.style.height = '100%';

        }
      }

    });

    // *点击其他.bottom_div_in时恢复.bottom_div_content_left_blur及text的属性(反正现在跑对了就行)
    // 应该说是在点击时对所有.bottom_div_in的属性进行初始化，将所有对应元素初始成原始值，而不是简单地将某一元素的值恢复(老子真流啤)
    restore_bottom_div_content_left_blur();
    restore_bottom_div_content_left_text();

  });
});

// 为document添加点击事件监听器
// 点击别处时清空active和.has_active并恢复原始值
document.addEventListener('click', function() {
  // 检查点击的目标元素是否在#second_floor_box内部
  if (event.target.closest('#second_floor_box')) {
    // 若是则不执行之后的代码
    return;
  }

  // 移除所有.bottom_div_in的active类
  document.querySelectorAll('.bottom_div_in').forEach(div => {
    div.classList.remove('active');
  });
  // 移除所有.bottom_div_in的.has_active子元素
  document.querySelectorAll('.bottom_div_in .has_active').forEach(div => {
    div.remove();
  });

  // 点击别处时恢复.bottom_div_content_left_blur及text的属性为原始值
  // 缺少还原text的属性, 但视觉上似乎问题不大, 避免出bug或者搞混就先空着, 到时要写了参考上面的大方法就行 25/03/31 22:29 来自自己
  // 现在就写好了哈哈哈老子太溜了 25/03/31 22:30 来自自己
  restore_bottom_div_content_left_blur();
  restore_bottom_div_content_left_text();
});




