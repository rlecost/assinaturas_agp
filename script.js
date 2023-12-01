// Função definida para mostrar a seleção de foto apenas quando a checkbox for marcada 
function mostrarEsconderPhoto() {
    var checkbox = document.getElementById("desejaAdicionarFoto");
    var profilePhotoSelection = document.getElementById("profilePhotoSelection");
    profilePhotoSelection.style.display = checkbox.checked ? "block" : "none";
}


//Função principal para criar a assinatura
function criarAssinatura() {
    var container = document.getElementById('assinaturaCriada');
    while (container.firstChild) { 
        container.removeChild(container.firstChild);
    }
    var lojaSelecionada = document.getElementById('lojaSelecionada').value; 
    var canvas = document.createElement("canvas"); 
    var ctx = canvas.getContext("2d", { alpha: true });
    var img = new Image();
    img.crossOrigin = 'anonymous';  

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var font1 = new FontFace("Gilroy-bold", "url('fonts/gilroy-bold.otf')", {});
        var font2 = new FontFace("Gilroy-light", "url('fonts/gilroy-light.otf')", {});

        font1.load().then(function(loaded_face) {
            document.fonts.add(loaded_face);
        }).catch(function(error) {
            console.log('Erro ao carregar a fonte:', error);
        });

        font2.load().then(function(loaded_face) {
            document.fonts.add(loaded_face);
            
            var nome = document.getElementById('nomeColaborador').value;
            var cargo = document.getElementById('cargoColaborador').value;
            var telefone = document.getElementById('telefoneColaborador').value;

            var nomeFontSize = 25;
            var cargoFontSize = 18;
            var telefoneFontSize = 18;

            ctx.font = nomeFontSize + "px Gilroy-bold";
            var nomeWidth = ctx.measureText(nome).width;
            ctx.font = cargoFontSize + "px Gilroy-light";
            var cargoWidth = ctx.measureText(cargo).width;
            ctx.font = telefoneFontSize + "px Gilroy-bold";
            var telefoneWidth = ctx.measureText(telefone).width;

            var nomeX = (canvas.width - nomeWidth) / 2;
            var cargoX = (canvas.width - cargoWidth) / 2;
            var telefoneX = (canvas.width - telefoneWidth) / 2;

            var whatsappImg = new Image();
            whatsappImg.src = './img/whatsapp_icon.png'; 
            
            whatsappImg.onload = function() {
                var iconSize = 100; 
                var iconX = telefoneX - iconSize + 40; 
                var iconY = 100 - iconSize / 2; 

                ctx.drawImage(whatsappImg, iconX, iconY, iconSize, iconSize);

                var profilePhotoInput = document.getElementById('profilePhoto');
                if (profilePhotoInput.files.length > 0) {
                    var file = profilePhotoInput.files[0];
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        var profilePhoto = new Image();
                        profilePhoto.src = e.target.result;

                        profilePhoto.onload = function() {
                            var iconSize = 105; 
                            var iconX = 560; // Posição x do ícone (10 pixels da borda esquerda)
                            var iconY = 23; // Posição y do ícone (10 pixels do topo)

                            // Desenhar uma elipse
                            ctx.save(); // Salvar o contexto atual
                            ctx.beginPath();
                            ctx.ellipse(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, iconSize / 2, 0, 0, Math.PI * 2);
                            ctx.closePath();
                            ctx.clip(); // Usar a elipse como uma máscara

                            ctx.drawImage(profilePhoto, iconX, iconY, iconSize, iconSize);
                            ctx.restore(); // Restaurar o contexto para remover a máscara elíptica
                            ctx.font = nomeFontSize + "px Gilroy-bold";
                            ctx.fillText(nome, nomeX, 60);
                            ctx.font = cargoFontSize + "px Gilroy-light";
                            ctx.fillText(cargo, cargoX, 80);
                            var lineHeight = 1; 
                            var lineWidth = 200; 
                            var lineX = (canvas.width - lineWidth) / 2; 
                            var lineY = 85;
                            ctx.fillRect(lineX, lineY, lineWidth, lineHeight);
                            ctx.font = telefoneFontSize + "px Gilroy-bold";
                            ctx.fillText(telefone, telefoneX, 105);

                            var finalImg = document.createElement("img");
                            finalImg.src = canvas.toDataURL("image/png");
                            container.appendChild(finalImg);
                            
                            document.getElementById('nomeColaborador').value = '';
                            document.getElementById('cargoColaborador').value = '';
                            document.getElementById('telefoneColaborador').value = '';
                            document.getElementById('profilePhoto').value = '';
                            document.getElementById("desejaAdicionarFoto").checked = false;


                            var downloadButton = document.createElement("button");
                            downloadButton.textContent = "Baixar imagem";
                            downloadButton.onclick = function() {
                                var link = document.createElement('a');
                                link.download = 'assinatura.png';
                                link.href = finalImg.src;
                                link.click();
                            };
                            downloadButton.className = "download-button";
                            container.appendChild(downloadButton);
                        };
                    };
                    reader.readAsDataURL(file);
                } else {
                    // Desenhar apenas o texto e o ícone do WhatsApp
                    ctx.font = nomeFontSize + "px Gilroy-bold";
                    ctx.fillText(nome, nomeX, 60);
                    ctx.font = cargoFontSize + "px Gilroy-light";
                    ctx.fillText(cargo, cargoX, 80);
                    var lineHeight = 1; 
                    var lineWidth = 200; 
                    var lineX = (canvas.width - lineWidth) / 2; 
                    var lineY = 85;
                    ctx.fillRect(lineX, lineY, lineWidth, lineHeight);
                    ctx.font = telefoneFontSize + "px Gilroy-bold";
                    ctx.fillText(telefone, telefoneX, 105);

                    var finalImg = document.createElement("img");
                    finalImg.src = canvas.toDataURL("image/png");
                    container.appendChild(finalImg);

                    document.getElementById('nomeColaborador').value = '';
                    document.getElementById('cargoColaborador').value = '';
                    document.getElementById('telefoneColaborador').value = '';
                    document.getElementById('profilePhoto').value = '';
                    document.getElementById("desejaAdicionarFoto").checked = false;

                    var downloadButton = document.createElement("button");
                    downloadButton.textContent = "Baixar imagem";
                    downloadButton.onclick = function() {
                        var link = document.createElement('a');
                        link.download = 'assinatura.png';
                        link.href = finalImg.src;
                        link.click();
                    };
                    downloadButton.className = "download-button";
                    container.appendChild(downloadButton);
                }
            };
        }).catch(function(error) {
            console.log('Erro ao carregar a fonte:', error);
        });
    };

    img.onerror = function() {
        alert("Erro ao carregar a imagem");
    };

    var checkbox = document.getElementById("desejaAdicionarFoto");


    if (checkbox.checked){
        switch (lojaSelecionada) {
            case 'grupoAgp':
                img.src = './img/grupoagp_2023F.png'; 
                break;
            case 'extremaJlr':
                img.src = './img/extrema_2023F.png'; 
                break;
            case 'terraMotos':
                img.src = './img/terramotos_2023F.png'; 
                break;
            case 'orionKia':
                img.src = './img/orion_2023F.png';
                break;
            case 'truckfor':
                img.src = './img/truckfor_2023F.png';
                break;
            case 'triumph':
                img.src = './img/triumph_2023F.png'
                break;
        }

    } else {
        switch (lojaSelecionada) {
            case 'grupoAgp':
                img.src = './img/grupoagp_2023.png'; 
                break;
            case 'extremaJlr':
                img.src = './img/extrema_2023.png'; 
                break;
            case 'terraMotos':
                img.src = './img/terramotos_2023.png'; 
                break;
            case 'orionKia':
                img.src = './img/orion_2023.png';
                break;
            case 'truckfor':
                img.src = './img/truckfor_2023.png';
                break;
            case 'triumph':
                img.src = './img/triumph_2023.png'
                break;
        }

    };

}

