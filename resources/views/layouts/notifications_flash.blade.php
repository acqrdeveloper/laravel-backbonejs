@if (session()->has('flash_notification.message'))
    <div id="idAlertFlash" class="alert alert-{{ session('flash_notification.level') }}">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        {!! session('flash_notification.message') !!}
    </div>
@endif
<script type="text/javascript">
    $('#idAlertFlash').not('.alert-important').delay(3000).fadeOut(350);
</script>