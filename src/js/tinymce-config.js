tinymce.init({
  selector: '#mytextarea',
  language: 'nl',
  content_css: 'css/style.css',
  images_upload_url: 'tinymanager/upload.php',
  /**
   * Options
   */
  browser_spellcheck: true,
  contextmenu: false, // Disabling the contextmenu option may be required depending on the right-click or context usability requirement.
  relative_urls: false, // Keep slash at the front of an url
  /**
   * Menu
   */
  plugins:
    'media image link table save code charmap emoticons advlist lists wordcount searchreplace help',
  toolbar: [
    'save | searchreplace undo redo | bold italic underline strikethrough | alignleft aligncenter alignright | link media image',
    'charmap emoticons |  numlist bullist',
    'styles fontfamily fontsize | forecolor backcolor removeformat ',
    'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
  ],
  menubar: 'insert tools table',
  /**
   * Save content
   */
  save_enablewhendirty: false,
  save_oncancelcallback: function () {
    alert('Save canceled')
  },
  save_onsavecallback: function () {
    var element = $($(this.getElement())),
      language = $(element).data('language'),
      content_id = $(element).data('content_id'),
      col = $(element).data('col'),
      content = this.getContent()
    /**
     * Store example with jQuery
     */
    $.ajax({
      method: 'POST',
      url: 'tinymanager/save_content.php',
      data: {
        language: language,
        content_id: content_id,
        col: col,
        content: content,
      },
      dataType: 'json',
    });
    alert('Saved \r\n')
  },
  /**
   * Images
   */
  image_advtab: true,
})