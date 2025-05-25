// 初始化 stagewise 工具栏
import('@stagewise/toolbar').then(({ initToolbar }) => {
  const stagewiseConfig = {
    plugins: []
  };
  
  initToolbar(stagewiseConfig);
}); 