import api from './api';

class App{
    constructor(){
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.listEl = document.getElementById('repo-list');
        this.inputEl = document.getElementById('repo');
        this.registerHandlers();
        
    }
    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');
                        
            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();
        const repoInput = this.inputEl.value;
        if(repoInput.lenght == 0)
            return;
        this.setLoading();
        try{
            const response = await api.get(`/repos/${repoInput}`);

            const {name, description, html_url, owner:{avatar_url}} = response.data;

            this.repositories.push({
                name ,
                description,
                avatar_url,
                html_url,
            });
            this.inputEl.innerHTML = '';
            this.render();
        }catch(err){
            alert('Repositório não encontrado!');
        }
        this.setLoading(false);
    }

    render(){
        this.listEl.innerHTML =  '';
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img'),
                titleEl = document.createElement('strong'),
                descEl = document.createElement('p'),
                linkEl = document.createElement('a'),
                listItem = document.createElement('li');

            imgEl.setAttribute('src', repo.avatar_url);
            titleEl.appendChild(document.createTextNode(repo.name));
            descEl.appendChild(document.createTextNode(repo.description));
            linkEl.setAttribute('target', '_blank');
            linkEl.appendChild(document.createTextNode('Acessar'));
            linkEl.setAttribute('href', repo.html_url);

            listItem.appendChild(imgEl);
            listItem.appendChild(titleEl);
            listItem.appendChild(descEl);
            listItem.appendChild(linkEl);

            this.listEl.appendChild(listItem);
        });

    }
    
}

new App();