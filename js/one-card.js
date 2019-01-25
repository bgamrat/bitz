Vue.component('one-card', {
    props: {
        id: "string", 
        title: "string",
        content: "string"
    },
    computed: {
        idHeader() {
            return this.id+"-header";
        },
        dataTarget() {
            return "#"+this.id;
        }
    },
    template: `
<div class="card">
    <div class="card-header bg-primary" :id="idHeader">
      <h5 class="mb-0 card-header-text">
        <button class="btn btn-link text-white" type="button" data-toggle="collapse" :data-target="dataTarget" aria-expanded="true" :aria-controls="id">
          {{title}}
        </button>
      </h5>
    </div>
    <div :id="id" class="collapse" :aria-labelledby="idHeader" data-parent="#accordion">
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</div>`
});