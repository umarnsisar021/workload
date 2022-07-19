<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>App</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ url('dist-assets/images/favicon.png') }}">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script src="{{  mix('/js/app.js') }}" defer></script>
  

    @routes
  </head>
  <body>
  
  
      {{-- <div id="main-loader" style="display:none" class="w-100 vh-100 justify-content-center align-items-center">
        <div class="spinner-bubble spinner-bubble-info m-5"></div>
      </div> --}}
    @inertia
  </body>
</html>
