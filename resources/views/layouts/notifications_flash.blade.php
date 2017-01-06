{{--@if (session()->has('flash_notification.message'))--}}
    {{--<div id="idAlertFlash" class="alert alert-{{ session('flash_notification.level') }}">--}}
        {{--<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>--}}
        {{--{!! session('flash_notification.message') !!}--}}
    {{--</div>--}}
{{--@endif--}}

{{--<div id="idAlertFlashApi" class="alert alert-success" hidden>--}}
    {{--<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>--}}
    {{--<p>successfully</p>--}}
{{--</div>--}}

{{--<script type="text/javascript">--}}
    {{--$('#idAlertFlash').not('.alert-important').delay(3000).fadeOut(350);--}}
    {{--$('#idAlertFlashApi').not('.alert-important').delay(3000).fadeOut(350);--}}
{{--</script>--}}


<div id="idAlertFlashApi" class="alert alert-warning hidden">
    <p></p>
</div>
