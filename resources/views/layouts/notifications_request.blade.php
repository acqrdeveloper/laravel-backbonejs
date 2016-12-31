@if ($errors->any())
    <div id="idAlertRequest" class="alert alert-danger">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        @foreach($errors->all() as $error)
            <p><span class="glyphicon glyphicon-alert"></span>&nbsp;&nbsp;{{ $error }}</p>
        @endforeach
    </div>
@endif
<script type="text/javascript">
    $('#idAlertRequest').delay(3000);
</script>