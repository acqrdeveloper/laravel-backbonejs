<script type="text/template" id="tplRowBarNotifyLoading">
    <li><a><%= txtLoading %></a></li>
</script>
<script type="text/template" id="icon-info-loading">
    <span><i class="fa fa-{{ icon }} fa-spin {{ icon_size }}"></i> {{ txt }}...</span>
</script>
<!--<script type="text/template" id="tplRowBarNotify">-->
<!--    <li {{ tipo == 2 ? 'class="alert-warning"' : '' }}>-->
<!--    <a href="--><?//= WEB_ADMINISTRADOR ?><!--/{{ url }}" class="push-url" data-url="{{ url }}">-->
<!--        <div>-->
<!--            <h5 class="text-primary"><i class="fa fa-check-square-o"></i> {{ modulo }} {{ tipo == 2 ? '<i class="fa fa-user text-success pull-right"></i>' : ''}}</h5>-->
<!--            <p class="small mb0">-->
<!--                <strong>{{ tipo == 1 ? creado_por : empresa_nombre }}</strong>-->
<!--                {{ descripcion }}-->
<!--                {[ if (tipo == 1) { ]}-->
<!--                <strong>{{ empresa_nombre }}</strong>-->
<!--                {[ } ]}-->
<!--            </p>-->
<!--            <small class="text-muted"><i class="fa fa-clock-o"></i> {{ created_at }}</small>-->
<!--        </div>-->
<!--    </a>-->
<!--    </li>-->
<!--    <li class="divider"></li>-->
<!--</script>-->