function WalkontableViewport(instance) {
  this.instance = instance;
  this.resetSettings();
}

//used by scrollbar
WalkontableViewport.prototype.getWorkspaceHeight = function (proposedHeight) {
  var height = this.instance.getSetting('height');

  if (height === Infinity || height === void 0 || height === null || height < 1) {
    return Infinity;
  }
  else if (proposedHeight > height) {
    height -= this.instance.getSetting('scrollbarHeight');
  }
  else if (this.instance.wtScrollbars.horizontal.visible) {
    height -= this.instance.getSetting('scrollbarHeight');
  }
  return height;
};

WalkontableViewport.prototype.getWorkspaceWidth = function (proposedWidth) {
  var width = this.instance.getSetting('width');
  if (width === Infinity || width === void 0 || width === null || width < 1) {
    return Infinity;
  }
  else if (proposedWidth > width) {
    width -= this.instance.getSetting('scrollbarWidth');
  }
  else if (this.instance.wtScrollbars.vertical.visible) {
    width -= this.instance.getSetting('scrollbarWidth');
  }
  return width;
};

WalkontableViewport.prototype.getWorkspaceActualHeight = function () {
  return this.instance.wtDom.outerHeight(this.instance.wtTable.TABLE);
};

WalkontableViewport.prototype.getWorkspaceActualWidth = function () {
  return this.instance.wtDom.outerWidth(this.instance.wtTable.TABLE) || this.instance.wtDom.outerWidth(this.instance.wtTable.TBODY) || this.instance.wtDom.outerWidth(this.instance.wtTable.THEAD); //IE8 reports 0 as <table> offsetWidth;
};

WalkontableViewport.prototype.getViewportHeight = function (proposedHeight) {
  var containerHeight = this.getWorkspaceHeight(proposedHeight);

  if (containerHeight === Infinity) {
    return containerHeight;
  }

  if (isNaN(this.columnHeaderHeight)) {
    var cellOffset = this.instance.wtDom.offset(this.instance.wtTable.TBODY)
      , tableOffset = this.instance.wtTable.tableOffset;
    this.columnHeaderHeight = cellOffset.top - tableOffset.top;
  }

  if (this.columnHeaderHeight > 0) {
    return containerHeight - this.columnHeaderHeight;
  }
  else {
    return containerHeight;
  }
};

WalkontableViewport.prototype.getViewportWidth = function (proposedWidth) {
  var containerWidth = this.getWorkspaceWidth(proposedWidth);

  if (containerWidth === Infinity) {
    return containerWidth;
  }

  if (isNaN(this.rowHeaderWidth)) {
    var TR = this.instance.wtTable.TBODY ? this.instance.wtTable.TBODY.firstChild : null;
    if (TR) {
      var TD = TR.firstChild;
      this.rowHeaderWidth = 0;
      while (TD && TD.nodeName === 'TH') {
        this.rowHeaderWidth += this.instance.wtDom.outerWidth(TD);
        TD = TD.nextSibling;
      }
    }
  }

  if (this.rowHeaderWidth > 0) {
    return containerWidth - this.rowHeaderWidth;
  }
  else {
    return containerWidth;
  }
};

WalkontableViewport.prototype.resetSettings = function () {
  this.rowHeaderWidth = NaN;
  this.columnHeaderHeight = NaN;
};