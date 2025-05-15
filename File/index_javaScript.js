console.log("cl test");

// 获取title元素
const title = document.querySelector('#title');
const head_title = document.querySelector('#head_title');
// 获取滚动距离
let scrollDistance = window.scrollY;
// 监听滚动函数
// 提取滚动事件处理函数
function handleScroll() {
  // 更新滚动距离
  scrollDistance = window.scrollY;

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




// 按钮点击跳转相关

// 滚动函数_非线性
function smoothRoll(targetElementIn, animationTimeIn) {
  if (targetElementIn) {
    // 获取当前滚动位置
    let start = window.scrollY;
    // 获取视口高度
    const viewportHeight = window.innerHeight;
    // 获取目标元素的高度
    const targetHeight = targetElementIn.offsetHeight;
    // 计算目标滚动位置(目标元素停于屏幕中间)
    let end = targetElementIn.offsetTop - (viewportHeight / 2) + (targetHeight / 2);
    // 定义滚动时间
    let duration = animationTimeIn;
    // 计算开始时间
    let startTime = null;
    // 使用缓动函数_非线性
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = timestamp - startTime;
      let scrollY = smoothAnimation(progress, start, end - start, duration);
      window.scrollTo(0, scrollY);
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }
    // 开始滚动动画
    requestAnimationFrame(step);
  }
}


// 跳转时长
const animationTime = 1000;


// 线性移动(一次方)
function linearAnimation(t, b, c, d) {
  return c * (t / d) + b;
}


// 非线性缓动
function smoothAnimation(t, b, c, d) {
  t /= d;
  t--;
  // 二次方缓动(需注释t--)
  // return -c * t * (t - 2) + b;
  // 三次方缓动
  // return c * (t * t * t + 1) + b;
  // 四次方缓动
  // return -c * (t * t * t * t - 1) + b;
  // 五次方缓动
  return c * (t * t * t * t * t + 1) + b;
  // 七次方缓动
  // return c * (t * t * t * t * t * t * t + 1) + b;
  // 九次方缓动
  // return c * (t * t * t * t * t * t * t * t * t + 1) + b;
}


// 页面振动
function pageShake() {
  // 给body添加shake类
  document.body.classList.add('upDownShake');
  // 动画结束后移除shake类
  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('upDownShake');
  }, { once: true });
}




// 入场效果相关
// 生成随机缓冲
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomInt = getRandomInt(2000, 3500);
// 整页延时
const pageDelay = randomInt;
// 首页部分间延时
const eachDelay = 40;
// 需要还原的元素定义在外部
const headElement = document.querySelector('#head');
const headImgElement = document.querySelector('#head_img');
const headFirstSectionElements = document.querySelectorAll('.head_first_section_in');
const headSecondSectionElements = document.querySelectorAll('.head_second_section_in_span');
const headThirdSectionElements = document.querySelectorAll('.head_third_section_in_span');
const cycleImgElement = document.querySelector('.cycle_img');

function pageAnimation() {
  // 页面覆盖层
  const secondFloorBackgroundCoverBox = document.querySelector('#second_floor_background_cover_box');
  const secondFloorBackgroundCoverBoxUpper = document.querySelector('#second_floor_background_cover_box_upper');
  const CoverBoxUpperSvg = document.querySelector('#cover_box_upper_svg');
  const backgroundCoverEachDelay = 420;
  const backgroundCoverEarly = 60;
  setTimeout(() => {
    const svg = document.getElementById('cover_box_upper_svg');
    const hourHand = svg.querySelector('.spinner_hour');
    const minuteHand = svg.querySelector('.spinner_minutes');
    hourHand.style.animationPlayState = 'paused';
    minuteHand.style.animationPlayState = 'paused';
    CoverBoxUpperSvg.style.opacity = '0%'
    setTimeout(() => {
      secondFloorBackgroundCoverBoxUpper.style.transform = 'translateX(100%)'
    }, backgroundCoverEachDelay / 1.5);
    setTimeout(() => {
      secondFloorBackgroundCoverBox.style.transform = 'translateX(100%)'
    }, backgroundCoverEachDelay * 1.66);
  }, pageDelay - backgroundCoverEachDelay * 1.66 - backgroundCoverEarly);

  // 顶部
  setTimeout(() => {
    headElement.style.transition = 'var(--transition-very-slow) cubic-bezier(.2,.6,0,1)'
    headElement.classList.remove('rollOnlyLeftMore');
  }, pageDelay);

  // 顶栏
  const firstSectionElements = document.querySelectorAll('.first_section_span');
  const secondSectionElements = document.querySelector('#second_section');
  const thirdSectionElements = document.querySelectorAll('.third_section_span');
  setTimeout(() => {
    firstSectionElements.forEach((ElementIn, index) => {
      setTimeout(() => {
        ElementIn.classList.remove('opacityDY0', 'rollOnlyRightMore');
      }, index * 60);
    })
    thirdSectionElements.forEach((ElementIn, index) => {
      setTimeout(() => {
        ElementIn.classList.remove('opacityDY0', 'rollOnlyLeftMore');
      }, index * 60);
    })
    secondSectionElements.classList.remove('rollOnlyUpMore');
  }, pageDelay - 100);

  // logo需要还原曲线故定义在外部
  setTimeout(() => {
    headImgElement.style.transition = 'var(--transition-normal)'
    headImgElement.style.filter = 'drop-shadow(0px 0px 20px rgb(0, 0, 0))'
    headImgElement.classList.remove('opacityDY0', 'rollOnlyLeftLess');
  }, pageDelay - 60);


  // 按钮群
  const headSectionEachDelay = 18;

  // 按钮群各区域曲线需要还原故定义在外部
  const headFirstSectionElementsLength = headFirstSectionElements.length;

  const headSecondSectionElementsLength = headSecondSectionElements.length;
  const headSecondSectionElementsHalfLength = headSecondSectionElementsLength / 2;

  const headThirdSectionElementsLength = headThirdSectionElements.length;
  const headThirdSectionElementsHalfLength = headThirdSectionElementsLength / 2;

  setTimeout(() => {
    // 区域一
    setTimeout(() => {
      let headFirstSectionElementsLengthTemp = 0;
      const headFirstSectionElementsInterval = setInterval(() => {
        headFirstSectionElements[headFirstSectionElementsLengthTemp].style.transition = 'var(--transition-slow) cubic-bezier(0,.64,.3,1)';
        headFirstSectionElements[headFirstSectionElementsLengthTemp].classList.remove('opacityDY0', 'rollOnlyLeftLess');
        headFirstSectionElementsLengthTemp++;
        if(headFirstSectionElementsLengthTemp == headFirstSectionElementsLength) {
          clearInterval(headFirstSectionElementsInterval);
        }
      }, headSectionEachDelay);
    }, pageDelay);

    // 区域二
    // 写小块那会怎么没想到interval
    setTimeout(() => {
      let headSecondSectionElementsLengthTemp = 0;
      const headSecondSectionElementsInterval = setInterval(() => {
        headSecondSectionElements[headSecondSectionElementsLengthTemp].style.transition = 'var(--transition-slow) cubic-bezier(0,.64,.3,1)';
        headSecondSectionElements[headSecondSectionElementsLengthTemp].classList.remove('opacityDY0', 'rollOnlyLeftLess');
        headSecondSectionElements[headSecondSectionElementsLengthTemp + headSecondSectionElementsHalfLength].style.transition = 'var(--transition-slow) cubic-bezier(0,.64,.3,1)';
        headSecondSectionElements[headSecondSectionElementsLengthTemp + headSecondSectionElementsHalfLength].classList.remove('opacityDY0', 'rollOnlyLeftLess');
        headSecondSectionElementsLengthTemp++;
        if(headSecondSectionElementsLengthTemp == headSecondSectionElementsHalfLength) {
          clearInterval(headSecondSectionElementsInterval);
        }
      }, headSectionEachDelay);
    }, pageDelay + headSectionEachDelay * headThirdSectionElementsHalfLength);

    // 区域三
    setTimeout(() => {
      let headThirdSectionElementsLengthTemp = 0;
      const headThirdSectionElementsInterval = setInterval(() => {
        headThirdSectionElements[headThirdSectionElementsLengthTemp].style.transition = 'var(--transition-slow) cubic-bezier(0,.64,.3,1)';
        headThirdSectionElements[headThirdSectionElementsLengthTemp].classList.remove('opacityDY0', 'rollOnlyLeftLess');
        headThirdSectionElements[headThirdSectionElementsLengthTemp + headThirdSectionElementsHalfLength].style.transition = 'var(--transition-slow) cubic-bezier(0,.64,.3,1)';
        headThirdSectionElements[headThirdSectionElementsLengthTemp + headThirdSectionElementsHalfLength].classList.remove('opacityDY0', 'rollOnlyLeftLess');
        headThirdSectionElementsLengthTemp++;
        if(headThirdSectionElementsLengthTemp == headThirdSectionElementsHalfLength) {
          clearInterval(headThirdSectionElementsInterval);
        }
      }, headSectionEachDelay)
    }, pageDelay + headSectionEachDelay * headSecondSectionElementsHalfLength  + headSectionEachDelay * headThirdSectionElementsHalfLength);
  }, eachDelay);


  // 轮播图与小块
  setTimeout(() => {
    // 由上至下
    // 轮播图曲线需要还原故定义在外部
    const bodyInEachDelay = 64;
    setTimeout(() => {
      cycleImgElement.style.transition = 'var(--transition-very-slow) cubic-bezier(0,.64,.3,1)'
      cycleImgElement.classList.remove('opacityDY0', 'rollOnlyUp');
    }, pageDelay - bodyInEachDelay);
    // 小块
    setTimeout(() => {
      const topRightInSpanInElements = document.querySelectorAll('.in_box_top_right_in_span_in');
      const topRightInSpanInElementsLength = topRightInSpanInElements.length;
      const topRightInSpanInElementsHalfLength = topRightInSpanInElementsLength / 2;
      let topRightInSpanInElementsLengthTemp = 0;
      const topRightInSpanInElementsInterval = setInterval(() => {
        topRightInSpanInElements[topRightInSpanInElementsLengthTemp].style.transition = 'var(--transition-very-slow) cubic-bezier(0,.64,.3,1)'
        topRightInSpanInElements[topRightInSpanInElementsLengthTemp].classList.remove('opacityDY0', 'rollOnlyUpLess');
        topRightInSpanInElements[topRightInSpanInElementsLengthTemp + topRightInSpanInElementsHalfLength].style.transition = 'var(--transition-very-slow) cubic-bezier(0,.64,.3,1)'
        topRightInSpanInElements[topRightInSpanInElementsLengthTemp + topRightInSpanInElementsHalfLength].classList.remove('opacityDY0', 'rollOnlyUpLess');
        topRightInSpanInElementsLengthTemp++;
        if(topRightInSpanInElementsLengthTemp == topRightInSpanInElementsHalfLength) {
          clearInterval(topRightInSpanInElementsInterval);
        }
      }, bodyInEachDelay * 1.2)
    }, pageDelay);
    
    // 轮播图与小块_由左至右
    // 应该从最后遍历至首个, for循环未知原因依然由首个遍历至最后_尝试使用while
    // while一样
    // 嘛的只能用递归
    // 嘛的递归效率太劲爆低了
    // 嘛的手动遍历
    // 哈哈哈现在优化掉了用不着了白研究了哈哈哈
  }, eachDelay * 2);

  // 块
  const bodyInBoxBottomInElements = document.querySelectorAll('.body_in_box_bottom_in');
  const bodyInBoxBottomInElementsLength = bodyInBoxBottomInElements.length;
  const bodyInBoxBottomInElementsEachDelay = 20;
  setTimeout(() => {
    let bodyInBoxBottomInElementsLengthTemp = 0;
    const bodyInBoxBottomInElementsInterval = setInterval(() => {
      bodyInBoxBottomInElements[bodyInBoxBottomInElementsLengthTemp].style.opacity = '100%';
      bodyInBoxBottomInElements[bodyInBoxBottomInElementsLengthTemp].classList.remove('rollOnlyLeft');
      bodyInBoxBottomInElementsLengthTemp++;
      if(bodyInBoxBottomInElementsLengthTemp == bodyInBoxBottomInElementsLength) {
        clearInterval(bodyInBoxBottomInElementsInterval)
      }
    }, bodyInBoxBottomInElementsEachDelay);
  }, pageDelay + bodyInBoxBottomInElementsEachDelay * 2);
}

pageAnimation();
setTimeout(() => {
  // 移去交互覆盖层
  const secondFloorBackgroundCoverBoxProhibitTouch = document.querySelector('#second_floor_background_cover_box_prohibit_touch');
  if (secondFloorBackgroundCoverBoxProhibitTouch) {
    secondFloorBackgroundCoverBoxProhibitTouch.remove();
  }
  // 还原顶部曲线
  headElement.style.transition = ''
  // 还原logo曲线
  headImgElement.style.transition = '';
  // 还原轮播图曲线(我也不知道小块曲线咋绑的)
  cycleImgElement.style.transition = 'var(--transition-normal)';
  // 还原按钮群曲线
  headFirstSectionElements.forEach((elementIn) => {
    elementIn.style.transition = '';
  });
  headSecondSectionElements.forEach((elementIn) => {
    elementIn.style.transition = '';
  });
  headThirdSectionElements.forEach((elementIn) => {
    elementIn.style.transition = '';
  });
}, pageDelay + 1200);

// 首页按钮
// behavior不支持自定义曲线, 下面的方法可以
// 首页按钮
const firstSectionSpan0 = document.querySelectorAll('.first_section_span_0');
firstSectionSpan0.forEach(span0 => {
  span0.addEventListener('click', function() {
    // 获取当前滚动位置
    let start = window.scrollY;
    // 定义目标滚动位置（顶部）
    let end = 0;
    if(start < 5120) {
      // 定义滚动时间
      let duration = animationTime;
      // 计算开始时间
      let startTime = null;
      // 使用缓动函数_非线性
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let scrollY = smoothAnimation(progress, start, end - start, duration);
        window.scrollTo(0, scrollY);
        if (progress < duration) {
          requestAnimationFrame(step);
        };
      };
      // 开始滚动动画
      requestAnimationFrame(step);
    }else {
      // 定义滚动时间
      let duration = animationTime / 3;
      // 计算开始时间
      let startTime = null;
      // 使用缓动函数_线性
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let scrollY = linearAnimation(progress, start, end - start, duration);
        window.scrollTo(0, scrollY);
        if (progress < duration) {
          requestAnimationFrame(step);
        };
      };
      setTimeout(() => {
        pageShake();
      }, duration - duration * 0.02);
      // 开始滚动动画
      requestAnimationFrame(step);
    }
  });
})
// 底部提示栏
const hiddenTime = 3000;  // 经过该时间后隐藏底部提示栏
function promptInfoBottomFillInText(Text) {
  promptInfoTextBottom.textContent = Text;
  promptInfoBottom.style.bottom = '0%';
  setTimeout(() => {
    promptInfoTextBottom.style.opacity = '100%';
  }, 200);
  setTimeout(() => {
    promptInfoTextBottom.style.opacity = '0%';
  }, hiddenTime);
  setTimeout(() => {
    // 原始值为-96px
    promptInfoBottom.style.bottom = '-96px';
  }, hiddenTime + 220);
};
// 已位于首页提示
const atHome = document.querySelectorAll('.first_section_span_0');
const promptInfoBottom = document.querySelector('#prompt_info_bottom');
const promptInfoTextBottom = document.querySelector('#prompt_info_bottom_text');
atHome.forEach(atHomeIn => {
    atHomeIn.addEventListener('click', function() {
      // 单位为px
      if(scrollDistance < 256) {
        console.log(scrollDistance);
        promptInfoBottomFillInText('你已经在首页了');
        setTimeout(() => {
          atHome.forEach(atHomeInIn => {
            atHomeInIn.style.pointerEvents = 'none';
          });
        }, 200);
        setTimeout(() => {
          atHome.forEach(atHomeInIn => {
            atHomeInIn.style.pointerEvents = 'auto';
          });
        }, hiddenTime + 220);
      }
    });
});

// 影集按钮
const firstSectionSpan1 = document.querySelectorAll('.first_section_span_1');
const bottomDivIn1 = document.querySelector('#bottom_div_in_1');
firstSectionSpan1.forEach(title1 => {
  title1.addEventListener('click', function() {
    bottomDivIn1.scrollIntoView({
      behavior: 'smooth',
      block: 'center' // 可选：'start', 'center', 'end', 'nearest'
    });
  });
});

// 源码下载按钮
const firstSectionSpan3 = document.querySelectorAll('.first_section_span_3');
firstSectionSpan3.forEach(span3 => {
  span3.addEventListener('click', function() {
    // 本页面打开
    // window.location.href = 'https://github.com/F5160/First_web_test';
    // 新页面打开
    window.open('https://github.com/F5160/First_web_test', '_blank');
  });
});

// 联系按钮 / 投递按钮_未完成
// 未知原因点击无反馈 25/05/07 18:41 来自自己
// 可能点击的依然为整个“联系”按钮
// 已通过设置覆盖按钮解决
const no6tooltipSection1s = document.querySelectorAll('.no_6_tooltip_section_1_title_overlay-button');
// console.log(no6tooltipSection1s);
no6tooltipSection1s.forEach(no6tooltipSection1 => {
  no6tooltipSection1.addEventListener('click', async () => {
    const textToCopy = 'bumblebee5160@qq.com';  // 要复制的文本
    try {
      // 复制到剪贴板
      await navigator.clipboard.writeText(textToCopy);
      console.log('#span_span_6_tooltip_section_1复制到剪贴板成功');
      promptInfoBottomFillInText('邮箱地址已复制到剪切板');
      // 限制点击时有未知bug导致交互混乱, 故删除
    } catch (err) {
      console.error('#span_span_6_tooltip_section_1复制到剪贴板失败:', err);
    }
  });
});

// 致谢按钮
const firstSectionSpan4 = document.querySelectorAll('.first_section_span_4');
const indispensablePageElement = document.querySelector('#indispensablePage');
const indispensableTextContentDivParaElement = document.querySelectorAll('#indispensableTextContent > div > p');
const indispensableTextContentDivParaSpanElement = document.querySelectorAll('#indispensableTextContent > div > p > span');
const indispensablePageButtonElement = document.querySelector('#indispensablePageButton');
firstSectionSpan4.forEach(span4 => {
  span4.addEventListener('click', function() {
    indispensableTextContentDivParaElement.forEach(paraElement => {
      paraElement.classList.add('visible');
    });
    indispensableTextContentDivParaSpanElement.forEach(paraSpanElement => {
      paraSpanElement.classList.add('visible');
    });
    indispensablePageButtonElement.classList.add('visible');
    indispensablePageElement.style.top = '-10%';  // 高为120%, *移动值为(高-100%)/2
  });
});
indispensablePageButtonElement.addEventListener('click', function() {
  firstSectionSpan4.forEach(span4 => {
    span4.style.pointerEvents = 'none';
  });
  indispensablePageElement.style.top = '-125%';  // 原始值为-125%
  setTimeout(() => {
    indispensableTextContentDivParaElement.forEach(paraElement => {
      paraElement.classList.remove('visible');
    });
    indispensableTextContentDivParaSpanElement.forEach(paraSpanElement => {
      paraSpanElement.classList.remove('visible');
    });
    indispensablePageButtonElement.classList.remove('visible');
    firstSectionSpan4.forEach(span4 => {
      span4.style.pointerEvents = 'auto';
    });
  }, 1600)  // css设置的过渡时间为1.6s
});



// 按钮群_跳转
// 获取父元素
const headSecondSectionElementsIn = document.getElementById('head_second_section_in');
// 绑定点击事件监听器到父元素
headSecondSectionElementsIn.addEventListener('click', function(event) {
  // 获取点击的元素的id
  const spanId = event.target.id;
  console.log(headSecondSectionElementsIn);
  console.log(event);
  console.log(event.target);
  console.log(event.target.id);
  // 根据元素的id构建目标元素id
  const targetId = spanId.replace('head_second_section_in_', 'bottom_div_in_');
  console.log('click the: [', spanId, '] jump to: [', targetId, ']')
  // 获取目标元素
  const targetElement = document.getElementById(targetId);
  // 滚动函数执行
  smoothRoll(targetElement, animationTime);

  // 闪烁前的延迟(以对应块快要移到屏幕中心时为准)(通过按钮群跳转至对应块时, 对应的块闪烁)
  const shineTime = animationTime - animationTime / 2;
  // 利用递归实现函数指定执行次数以及每次循环的间隔
  // func是要执行的函数, times是指定执行次数, delay是每次循环的间隔
  function executeWithDelay(func, times, delay) {
    // 执行次数计数
    let count = 0
    function execute() {
      if(count < times) {
        func();
        count++;
        setTimeout(execute, delay);
      }
    }
    execute();
  }
  // 定义闪烁函数(通过按钮群跳转至对应块时, 对应的块闪烁)
  function backgroundShine() {
    setTimeout(() => {
      // 边缘发光暂时不知道咋写 25/04/17 00:24 来自自己
      // targetElement.style.boxShadow = '0px 0px 12px 0px rgba(0, 0, 0, 1)'
      // targetElement.querySelector('.bottom_div_content_box').style.boxShadow = '0px 0px 12px 0px rgba(0, 0, 0, 1)'
      targetElement.querySelector('.bottom_div_content_box').querySelector('.bottom_div_content_background').style.transition = '0.1s';
      targetElement.querySelector('.bottom_div_content_box').querySelector('.bottom_div_content_background').style.filter = 'brightness(120%)';
    }, shineTime)
    setTimeout(() => {
      // 过渡时间原始值为0.6s
      targetElement.querySelector('.bottom_div_content_box').querySelector('.bottom_div_content_background').style.transition = '0.6s';
      targetElement.querySelector('.bottom_div_content_box').querySelector('.bottom_div_content_background').style.filter = 'brightness(100%)';
    }, shineTime + 550)
  }
  // 开始循环
  executeWithDelay(backgroundShine, 2, 865);
});

// 未完成提示
const unfinished = document.querySelectorAll('.first_section_span_2, .first_section_span_7, #search_btn, #in_box_top_right_in_span_in_4 , .head_first_section_span, #head_third_section_in_span_4');
const promptInfo = document.querySelector('#prompt_info');
const promptInfoText = document.querySelector('#prompt_info_text');
unfinished.forEach(unfinishedIn => {
  unfinishedIn.addEventListener('click', function() {
    promptInfoText.textContent = '板块开发中, 预计6月上线';
    promptInfo.style.setProperty('--prompt-info-height', '50px');
    // 经过该时间后隐藏
    const hiddenTime = 3000;
    setTimeout(() => {
      promptInfoText.style.opacity = '100%';
      unfinished.forEach(unfinishedInIn => {
        unfinishedInIn.style.pointerEvents = 'none';
      })
    }, 60)
    setTimeout(() => {
      promptInfoText.style.opacity = '0%';
    }, hiddenTime)
    setTimeout(() => {
      promptInfo.style.setProperty('--prompt-info-height', '0px');
      unfinished.forEach(unfinishedInIn => {
        unfinishedInIn.style.pointerEvents = 'auto';
        promptInfoText.textContent = '';
      })
    }, hiddenTime + 100)
  });
});




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



let cycle_img_second_floor_0 = [
  {url: 'File/img/head_img.png@3840w_360h_1c.webp', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_1 = [
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn0.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn1.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn2.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn3.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn4.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn5.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn6.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn7.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn8.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn9.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/waiting_for_a_new_dawn/waiting_for_a_new_dawn/waiting_for_a_new_dawn10.jpg', text: 'now is #bottom_div_in_0 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_2 = [
  {url: 'File/img/fantasy/fantasy/fantasy0.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy1.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy2.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy3.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy4.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy5.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy6.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy7.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy8.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy9.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/fantasy/fantasy/fantasy10.jpg', text: 'now is #bottom_div_in_2 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_3 = [
  {url: 'File/img/billows/billows/billows0.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows1.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows2.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows3.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows4.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows5.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows6.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows7.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows8.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows9.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows10.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/billows/billows/billows11.jpg', text: 'now is #bottom_div_in_3 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_4 = [
  {url: 'File/img/miniature/miniature/miniature0.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature1.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature2.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature3.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature4.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature5.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature6.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature7.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature8.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/miniature/miniature/miniature9.jpg', text: 'now is #bottom_div_in_4 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_5 = [
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle0.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle1.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle2.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle3.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle4.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle5.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle6.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle7.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle8.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle9.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle10.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle11.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle12.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle13.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle14.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle15.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle16.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle17.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle18.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle19.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle20.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle21.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle22.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle23.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle24.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle25.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle26.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle27.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle28.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle29.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle30.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle31.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle32.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle33.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle34.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle35.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle36.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle37.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle38.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle39.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle40.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle41.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle42.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle43.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle44.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle45.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle46.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle47.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle48.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle49.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle51.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle52.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle53.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle54.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/hustle_and_bustle/hustle_and_bustle/hustle_and_bustle55.jpg', text: 'now is #bottom_div_in_5 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_6 = [
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past0.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past1.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past2.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past3.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past4.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past5.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past6.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past7.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past8.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past9.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past10.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past11.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past12.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past13.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past14.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past15.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past16.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past17.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past18.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past19.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past20.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past21.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past22.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past23.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past24.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past25.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past26.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past27.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past28.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past29.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past30.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past31.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past32.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past33.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/flux_of_time/glory_of_past/glory_of_past34.jpg', text: 'now is #bottom_div_in_6 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_7 = [
  {url: 'File/img/game/just_relax/just_relax0.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax1.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax2.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax3.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax4.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax5.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax6.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax7.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax8.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax9.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax10.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax11.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax12.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax13.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax14.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax15.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax16.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax17.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax18.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax19.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/game/just_relax/just_relax20.jpg', text: 'now is #bottom_div_in_7 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_8 = [
  {url: 'File/img/little_wonders/little_wonders/little_wonders0.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders1.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders2.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders3.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders4.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders5.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders6.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders7.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders8.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders9.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders10.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders11.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders12.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/little_wonders/little_wonders/little_wonders13.jpg', text: 'now is #bottom_div_in_8 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_9 = [
  {url: 'File/img/unclassified/unclassified/unclassified0.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified1.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified2.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified3.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified4.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified5.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified6.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified7.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified8.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified9.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified10.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified11.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified12.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified13.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified14.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified15.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified16.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified17.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified18.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified19.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified20.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified21.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified22.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified23.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified24.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified25.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified26.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified27.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified28.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified29.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified30.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified31.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified32.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified33.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified34.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified35.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified36.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified37.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified38.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified39.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified40.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified41.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified42.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified43.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified44.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified45.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified46.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified47.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified48.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified49.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified50.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified51.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified52.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified53.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified54.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified55.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified56.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified57.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified58.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified59.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified60.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified61.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified62.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified63.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified64.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified65.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified66.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/unclassified/unclassified/unclassified67.jpg', text: 'now is #bottom_div_in_9 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_10 = [
  {url: 'File/img/favorite/foremost/foremost0.jpg', text: 'now is #bottom_div_in_10 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/favorite/foremost/foremost1.jpg', text: 'now is #bottom_div_in_10 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/favorite/foremost/foremost2.jpg', text: 'now is #bottom_div_in_10 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/favorite/foremost/foremost3.jpg', text: 'now is #bottom_div_in_10 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/favorite/foremost/foremost4.jpg', text: 'now is #bottom_div_in_10 list', author: '#F5160', time: 'XX/XX/XX'}, 
  {url: 'File/img/favorite/foremost/foremost5.jpg', text: 'now is #bottom_div_in_10 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_11 = [
  {url: 'File/img/head_img.png@3840w_360h_1c.webp', text: 'now is #bottom_div_in_11 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_12 = [
  {url: 'File/img/head_img.png@3840w_360h_1c.webp', text: 'now is #bottom_div_in_12 list', author: '#F5160', time: 'XX/XX/XX'}
];

let cycle_img_second_floor_13 = [
  {url: 'File/img/head_img.png@3840w_360h_1c.webp', text: 'now is #bottom_div_in_13 list', author: '#F5160', time: 'XX/XX/XX'}
];

// 创建映射表
const listMap = {
  cycle_img_second_floor_0,
  cycle_img_second_floor_1,
  cycle_img_second_floor_2,
  cycle_img_second_floor_3, 
  cycle_img_second_floor_4,
  cycle_img_second_floor_5,
  cycle_img_second_floor_6,
  cycle_img_second_floor_7, 
  cycle_img_second_floor_8,
  cycle_img_second_floor_9,
  cycle_img_second_floor_10,
  cycle_img_second_floor_11, 
  cycle_img_second_floor_12, 
  cycle_img_second_floor_13, 
};




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




// 轮播图切换方法集成
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
    clearTimeout(cycle_timeId); // 清除当前的定时器
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




// 触控切换
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
  console.log('mouseStart', mouse_startX, mouse_startY); // 添加调试信息
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
    console.log('mouseEnd', endX, endY, deltaX, deltaY); // 添加调试信息

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




// 动态监听窗口宽度决定显示6个或4个内容, 显示4个内容时不显示第3和第6个
function adjustInBoxTopRightIn() {
  const inBoxTopRightIn = document.getElementById('in_box_top_right_in');
  const spans = inBoxTopRightIn.getElementsByClassName('in_box_top_right_in_span');
  const subWorksCard = document.querySelector('#head_third_section_in_span_2 .first_section_span_span_6_tooltip');
  if (window.innerWidth <= 1399.9) {
    // 隐藏第3和第6个元素
    spans[2] && (spans[2].style.display = 'none');
    spans[5] && (spans[5].style.display = 'none');
    // 显示其他元素
    for (let i = 0; i < spans.length; i++) {
      if (i !== 2 && i !== 5) {
        spans[i].style.display = 'block';
      }
    }
    // 只显示4个小块时优化下拉卡片位置
    // 按钮群完全贴边之前再次优化
    if (window.innerWidth <= 1140) {
      subWorksCard.style.transform = 'translateX(-80%)';
    }else {
      subWorksCard.style.transform = 'translateX(-64%)';
    }
  } else {
    // 显示所有元素
    for (let i = 0; i < spans.length; i++) {
      spans[i].style.display = 'block';
    }
    // 恢复原始位置(-60%)
    subWorksCard.style.transform = 'translateX(-60%)';
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
const bottomDivInElement = document.querySelectorAll('.bottom_div_in');
bottomDivInElement.forEach(item => {
  item.addEventListener('click', function(event) {
    console.log(item);
    const itemId = item.id;
    console.log(itemId);
    const listId = itemId.replace('bottom_div_in_', 'cycle_img_second_floor_');
    console.log(listId, listId.length, typeof itemId);
    const listIdObj = listMap[listId];
    // 注意: 数组和对象输出的类型都是'object'
    console.log(listIdObj, listIdObj.length, typeof listIdObj);

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

      // 更新二层列表相关
      // 查找父元素
      const secondFloorBodyTopRightListUlElement = document.getElementById('second_floor_body_top_right_list_ul');
      // 添加新的<li>的方法
      // <li>之间的横线通过css生成
      function addNewLi(listIn) {
        // 二次赋值(以免变量混淆)
        const secondFloorBodyTopRightListUlElementIn = secondFloorBodyTopRightListUlElement;
      
        const newLiElement = document.createElement('li');
        const newDivElement = document.createElement('div');
        const newParagraphElement = document.createElement('p');

        newParagraphElement.dataset.insertUrl = listIn.url;
        newParagraphElement.textContent = listIn.text;
        newParagraphElement.dataset.insertAuthor = listIn.author;
        newParagraphElement.dataset.insertTime = listIn.time;
      
        newDivElement.appendChild(newParagraphElement);
        newLiElement.appendChild(newDivElement);
        secondFloorBodyTopRightListUlElementIn.appendChild(newLiElement);
      };
      // 清除原有的全部子元素
      document.getElementById('second_floor_body_top_right_list_ul').textContent = '';
      // 逐个添加为列表中的元素
      for(let itemIn of listIdObj) {
        addNewLi(itemIn);
      };
      // active相关
      const secondFloorListLis = document.querySelectorAll('#second_floor_body_top_right_list_ul > li');
      const secondFloorListTitle = document.querySelector('#second_floor_body_top_right_info_title');
      const secondFloorListAuthor = document.querySelector('#second_floor_body_top_right_info_author');
      const secondFloorListTime = document.querySelector('#second_floor_body_top_right_info_time');
      const secondFloorBodyTopLeft = document.querySelector('#second_floor_body_top_left');
      // 默认选中首个li
      secondFloorListLis.forEach(li => li.classList.remove('second_floor_list_has_active'));
      secondFloorListLis[0].classList.add('second_floor_list_has_active');
      // 默认填入首个li的内容
      const selectedText = secondFloorListLis[0].querySelector('p').textContent;
      const imageAuthor  = secondFloorListLis[0].querySelector('p').dataset.insertAuthor;
      const imageTime    = secondFloorListLis[0].querySelector('p').dataset.insertTime;
      const imageUrl     = secondFloorListLis[0].querySelector('p').dataset.insertUrl;
      secondFloorListTitle.textContent = selectedText;
      secondFloorListAuthor.textContent = imageAuthor;
      secondFloorListTime.textContent = imageTime;
      secondFloorBodyTopLeft.style.backgroundImage = `url('${imageUrl}')`;
      // 为选中的li添加second_floor_list_has_active类
      secondFloorListLis.forEach(li => {
        li.addEventListener('click', function () {
          // 移除所有li的second_floor_list_has_active类
          secondFloorListLis.forEach(li => li.classList.remove('second_floor_list_has_active'));
          // 防止重复点击_用户不能重复点击同一个li
          if (!this.classList.contains('second_floor_list_has_active')) {
            secondFloorListLis.forEach(li => li.classList.remove('has_active'));
            // 为当前点击的li添加has_active类
            this.classList.add('second_floor_list_has_active');
          }
          const selectedText = this.querySelector('p').textContent;
          const imageAuthor  = this.querySelector('p').dataset.insertAuthor;
          const imageTime    = this.querySelector('p').dataset.insertTime;
          const imageUrl     = this.querySelector('p').dataset.insertUrl;
          console.log('Selected:', selectedText, 'Image URL:', imageUrl, 'Image Author:', imageAuthor, 'Image Time:', imageTime);
          secondFloorListTitle.textContent = selectedText;
          secondFloorListAuthor.textContent = imageAuthor;
          secondFloorListTime.textContent = imageTime;
          secondFloorBodyTopLeft.style.backgroundImage = `url('${imageUrl}')`;
        });
      });

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
      // 已修改为[最后一次进入]的主题而不是[上次点击]的主题(lastTimeGoIn) 25/05/12 13:57 来自自己
      if(item.classList.contains('lastTimeGoIn')) {
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
        // 已修改为[最后一次进入]的主题而不是[上次点击]的主题(lastTimeGoIn) 25/05/12 13:57 来自自己
        // 清除所有主题的标记
        bottomDivInElement.forEach(clearItem => {
          clearItem.classList.remove('lastTimeGoIn');
        })
        // 为目前进入的主题添加标记
        item.classList.add('lastTimeGoIn');
        // 为.has_active元素添加active_1类
        // 下面这行现在没啥用了
        // 《本程序依靠该bug运行》
        // 草草草现在还真又有用了(好几天后写下)
        // 踏马的这就是所谓的升级接口吗
        // 踏马的给过去的自己磕个头
        // 已修改为[最后一次进入]的主题而不是[上次点击]的主题(lastTimeGoIn) 25/05/12 13:57 来自自己
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
          // console.log('click the', this);
          // 获取当前点击的盒子的元素
          const thisBackgroundImageElement = this.closest('.bottom_div_content_box').querySelector('.bottom_div_content_background');
          const thisTextTitleElement = this.closest('.bottom_div_content_box').parentNode.querySelector('.bottom_div_title_box').querySelector('.bottom_div_title');
          const thisTextTitleDescriptionElement = this.closest('.bottom_div_content_box').parentNode.querySelector('.bottom_div_title_box').querySelector('.bottom_div_title_description');
          // console.log(thisBackgroundImageElement);
          // console.log(thisTextTitleElement);
          // console.log(thisTextTitleDescriptionElement);
          if (thisBackgroundImageElement) {
              // *获取当前点击的盒子的元素的最终属性
              const thisBackgroundImageStyle = window.getComputedStyle(thisBackgroundImageElement);
              if (thisBackgroundImageStyle) {
                // 若不为空则将当前点击的盒子的元素的内容填入覆盖层
                secondFloorCoverImgElement.style.transition = '0s';
                secondFloorCoverImgElement.style.backgroundImage = thisBackgroundImageStyle.backgroundImage;
                if(thisTextTitleElement) {
                  secondFloorCoverTextTitleElement.src = thisTextTitleElement.src;
                }
                // 若介绍为两行则填充单行版本_id及判断自己加
                if (thisTextTitleDescriptionElement && thisTextTitleDescriptionElement.id === 'bottom_div_in_3_doubleLineDescriptionWarning') {
                  secondFloorCoverTextDescriptionElement.src = 'File/img/billows/billows_description_singleLine.svg';
                  // console.log(thisTextTitleDescriptionElement.src);
                } else if (thisTextTitleDescriptionElement && thisTextTitleDescriptionElement.id === 'bottom_div_in_6_doubleLineDescriptionWarning') {
                  secondFloorCoverTextDescriptionElement.src = 'File/img/flux_of_time/朝夕_描述_单行.svg';
                  // console.log(thisTextTitleDescriptionElement.src);
                } else if (thisTextTitleDescriptionElement && thisTextTitleDescriptionElement.id === 'bottom_div_in_8_doubleLineDescriptionWarning') {
                  secondFloorCoverTextDescriptionElement.src = 'File/img/little_wonders/奇事_描述_单行.svg';
                  // console.log(thisTextTitleDescriptionElement.src);
                } else if (thisTextTitleDescriptionElement) {
                  secondFloorCoverTextDescriptionElement.src = thisTextTitleDescriptionElement.src;
                  // console.log(thisTextTitleDescriptionElement.src);
                } else {
                  // 处理 thisTextTitleDescriptionElement 为 null 的情况
                  // 现已预设了内容及路径故无需再填充为空值 25/04/17 00:35 来自自己
                  // 需要填充为预设值否则将显示上一次填入的内容, *这里的填充相当于刷新为原样式 25/04/18 00:17 来自自己
                  secondFloorCoverTextDescriptionElement.src = 'File/img/null_description.svg';
                  console.warn('thisTextTitleDescriptionElement is null, skipping');
                }
                // console.log(thisBackgroundImageStyle.backgroundImage);
                // console.log(thisTextTitleElement.src);
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
            // 似乎有bug, 通过此方式暂停再恢复播放后似乎会使循环时间混乱
            // clearInterval(cycle_timeId);
            // console.log('进入二层, cycle_timeId停止');
          }, coverDisappearDelayTime + coverDisappearDelayTimeDelay + 1200); // 1200为coverDisappearTransitionTime, 变量原始格式不同所以不能直接相加
          // 返回按钮还原属性_还没写_可能还有属性改变而未在此列出(晚些时候写下)(记得再检查检查, 不过要是能跑就先不管[更晚些时候写下])
          // *似乎是由于在首次进入二层时就已经给返回按钮(#first_section_second_floor)设定了功能, 所以无需在别处重复设定
          // secondFloorCoverTextBoxElement的过渡时间似乎有未知bug_应该直接还原为2.16s(原始值)就行
          // secondFloorCoverTextBoxElement已修改逻辑: 初始过渡为0, 仅在需要时修改时长 25/04/07 23:27 来自自己
          const firstSectionSecondFloor = document.querySelector('#first_section_second_floor');
          firstSectionSecondFloor.addEventListener('click', function() {
            // 使用此动画则一层左模糊还原延迟设为100
            secondFloorElement.style.transition = '1s';
            // secondFloorElement.style.transitionTimingFunction = 'cubic-bezier(.09,.41,.33,.99)';
            secondFloorElement.style.transitionTimingFunction = 'cubic-bezier(.11,.42,.49,1.23)';
            // 使用此动画则一层左模糊还原延迟设为500
            // secondFloorElement.style.transition = '1s';
            // secondFloorElement.style.transitionTimingFunction = 'cubic-bezier(.76,.07,.88,.24)';
            secondFloorElement.style.transform = 'translate(100%, -100%)';
            // 获取目标元素
            // const targetElement = document.querySelector('.active_1').closest('.bottom_div_content_box').closest('.bottom_div_in');
            // 牵连修改(lastTimeGoIn) 25/05/12 13:57 来自自己
            const targetElement = item;
            console.log('roll to active_1', targetElement);
            // 滚动函数执行
            smoothRoll(targetElement, animationTime * 1.6);

            secondFloorCoverTextBoxElement.style.transition = '0s';
            secondFloorCoverTextBoxElement.style.transform = 'translateY(-90%)';
            secondFloorCoverTextBoxElement.style.opacity = '100%';

            secondFloorCoverTextDescriptionElement.style.transition = '0s';;
            secondFloorCoverTextDescriptionElement.style.transform = 'translateY(80%)';

            setTimeout(() => {
              secondFloorElement.style.transition = '0s';
              restore_bottom_div_content_left_blur();
              restore_bottom_div_content_left_text();
              // 似乎有bug, 通过此方式暂停再恢复播放后似乎会使循环时间混乱
              // startCarousel();
              // console.log('退出二层, cycle_timeId重新启动');
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



